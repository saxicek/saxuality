---
layout: post
title: Enable Oracle database transparent encryption on column
date: '2015-09-15T11:38:00.003+02:00'
author: Libor Nenadál
tags:
modified_time: '2015-11-27T11:33:59.422+01:00'
blogger_id: tag:blogger.com,1999:blog-17453343.post-9070921419478828904
blogger_orig_url: http://saxuality.blogspot.com/2015/09/enable-oracle-database-transparent.html
---

Jump start for Oracle transparent encryption for table column:

1. Create directory:
   <pre>/$ORACLE_BASE/admin/<i>database_name</i>/wallet</pre>

2. Create and open wallet:
   <pre>ALTER SYSTEM SET ENCRYPTION KEY IDENTIFIED BY "<i>password</i>";</pre>

3. Set table column as encrypted:
   <pre>ALTER TABLE user ADD (password VARCHAR2(100) <b>ENCRYPT</b>);</pre>


> Note: After system restart wallet must be reopened using command:
<pre>ALTER SYSTEM SET ENCRYPTION WALLET OPEN IDENTIFIED BY "<i>password</i>";</pre>
