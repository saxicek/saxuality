---
layout: post
title: Best practices when working with dates in multi-timezone environment in Oracle
  database
date: '2013-04-16T12:53:00.000+02:00'
author: Libor Nenadál
tags:
- database
- time
- time zone
- Oracle
- date
- PL/SQL
- best practice
modified_time: '2013-04-16T18:35:27.631+02:00'
blogger_id: tag:blogger.com,1999:blog-17453343.post-2458766197376847566
blogger_orig_url: http://saxuality.blogspot.com/2013/04/best-practices-when-working-with-dates.html
---

The following points are summary of practices any Oracle database developer should be aware of when working with time, date and time zones.

> Do not compare data types with time zone component to data types without time
zone component.

If you do so then Oracle implicitly converts types to those with higher
precision (i.e. with time zone component) using session time zone. Because
`DATE` value may be related to some other time zone the result may be incorrect.
Best approach is to explicitly add the time zone information using function
`from_tz()` and then do the comparison of time zone aware data types.

```SQL
-- Wrong - date_value is implicitly converted to TIMESTAMP WITH TIME ZONE
--         using session time zone
t.date_value > SYSTIMESTAMP
-- Correct - time zone must be explicitly set
to_timestamp(t.date_value) AT TIME ZONE t.time_zone > SYSTIMESTAMP
```

> Choose carefully data types of variables.

If data type is incorrect, Oracle will perform implicit conversion which causes
issues described in previous paragraph. These issues are very hard to find.

> Be careful with date time arithmetic.

When working with `TIMESTAMP WITH [LOCAL] TIME ZONE` do not add / subtract days
using `NUMBER`, because this operation results in `DATE`. Always use `INTERVAL`.

```
DECLARE
  v_ts    TIMESTAMP WITH LOCAL TIME ZONE;
BEGIN
  -- wrong - automatic conversion to DATE and back using
  --         session time zone
  v_ts := SYSTIMESTAMP + 1; -- WRONG!
  -- correct approach
  v_ts := SYSTIMESTAMP + INTERVAL '1' DAY;
  -- another correct approach
  v_ts := SYSTIMESTAMP + NUMTODSINTERVAL(1, 'DAY');
END;
```

> TRUNC() function is dangerous.

Result of `TRUNC()` function is `DATE` even if the input parameter is `TIMESTAMP
WITH [LOCAL] TIME ZONE`. Because result of this function is usually used for
comparisons, issues from the first point may come unnoticed. For this reason the
function `sys_util_pkg.trunc()` was introduced. It accepts input parameter of
type `TIMESTAMP WITH TIME ZONE` and returns truncated value in the same time
zone which was received on input.

```
DECLARE
  v_ts    TIMESTAMP WITH TIME ZONE;
BEGIN
  EXECUTE IMMEDIATE 'ALTER SESSION SET TIME_ZONE = ''Europe/Prague''';
  v_ts := to_timestamp_tz('1.1.2000 0:00:00 Pacific/Auckland', 'dd.mm.yyyy hh24:mi:ss tzr');

  -- wrong - automatic conversion to DATE and back using
  --         session time zone
  IF v_ts = trunc(v_ts) THEN
    dbms_output.put_line('Equal.');
  ELSE
    -- evaluated as not equal!
    dbms_output.put_line('Not equal.');
  END IF;
  -- correct approach
  IF v_ts = sys_util_pkg.trunc(v_ts) THEN
    dbms_output.put_line('Equal.');
  ELSE
    dbms_output.put_line('Not equal.');
  END IF;
END;
```

Function `sys_util_pkg.trunc()` is implemented as following:

```
-- ******************************************************************************
-- Function truncates hours, minutes and seconds from the timestamp. Difference from
-- system function trunc() is that this function returns TIMESTAMP WITH TIME ZONE
-- type and not DATE type.
--
-- @param p_ts Timestamp with time zone to be truncated
-- @param p_fmt Format for truncate; currently 'DD' and 'MM' are supported. If format
--              is not supported, exception is raised.
-- @return Truncated timestamp in the original time zone
-- ******************************************************************************
FUNCTION trunc (
  p_ts            IN TIMESTAMP WITH TIME ZONE
 ,p_fmt           IN VARCHAR2 := 'DD'
) RETURN TIMESTAMP WITH TIME ZONE DETERMINISTIC
IS
  v_result TIMESTAMP(9) WITH TIME ZONE;
BEGIN
  IF p_fmt = 'DD' THEN
    -- truncate time information
    SELECT p_ts - numtodsinterval(to_char(p_ts, 'HH24'), 'hour')
                - numtodsinterval(to_char(p_ts, 'MI'), 'minute')
                - numtodsinterval(to_char(p_ts, 'SSXFF9'), 'second')
      INTO v_result
      FROM dual;
  ELSIF p_fmt = 'MM' THEN
    -- truncate days and time information
    SELECT p_ts - numtodsinterval(to_char(p_ts, 'DD') - 1, 'day')
                - numtodsinterval(to_char(p_ts, 'HH24'), 'hour')
                - numtodsinterval(to_char(p_ts, 'MI'), 'minute')
                - numtodsinterval(to_char(p_ts, 'SSXFF9'), 'second')
      INTO v_result
      FROM dual;
  ELSE
    -- format is not supported
    DBMS_STANDARD.raise_application_error(v_errcode, 'Format '||p_fmt||' is not supported');
  END IF;

  RETURN v_result;
END trunc;
```

> Do not use SYSDATE

`SYSDATE` returns `DATE` data type and when considering current time you must
work in the context of some time zone; `SYSTIMESTAMP` must be used instead. The
only exception is when you are implementing system maintenance code which
depends on system time of the server. But usually you are working with business
logic where time zone must be considered and explicitly stated.

> AT TIME ZONE

Whenever you need to change time zone of type `TIMESTAMP WITH [LOCAL] TIME ZONE`
use construct `AT TIME ZONE <time_zone>`.

```
SELECT SYSTIMESTAMP AT TIME ZONE 'Pacific/Auckland' FROM DUAL
```
