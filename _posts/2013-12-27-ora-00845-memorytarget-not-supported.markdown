---
layout: post
title: ! 'ORA-00845: MEMORY_TARGET not supported on this system (Ubuntu)'
date: '2013-12-27T15:35:00.000+01:00'
author: Libor Nenadál
tags:
modified_time: '2013-12-27T15:42:39.848+01:00'
blogger_id: tag:blogger.com,1999:blog-17453343.post-8290434507457717527
blogger_orig_url: http://saxuality.blogspot.com/2013/12/ora-00845-memorytarget-not-supported-on.html
---

I upgraded Ubuntu distribution recently and experinced following error when
starting Oracle instance:

```
Connected to an idle instance.

SQL> startup;
ORA-00845: MEMORY_TARGET not supported on this system
```

The cause is well described [here](https://community.oracle.com/message/9945841) -
Ubuntu changed location of `/dev/shm` and for that reason Oracle cannot use
automatic memory management. There are basically 2 options to resolve the issue:

1. Copy `/run/shm` back to `/dev/shm` - well described
   [here](http://mdahlman.wordpress.com/2013/07/10/oracle-on-ubuntu/); search
   for "ORA-00845: MEMORY_TARGET"

2. Configure your instance not to use automatic memory management

I chose the second approach and will describe it here in more detailed steps.

1. Edit your `init*.ora` file (in my installation it is located in
   `/u01/app/oracle/product/11.2.0/dbhome_3/dbs` - remove parameter `memory_target`
   and add parameters `sga_target` and `pga_aggregate_target`. As written in
   [this](http://osamamustafa.blogspot.cz/2012/11/sgamaxsize-sgatarget-memorytarget.html)
   article, SGA should be 60% and PGA 40% of the memory_target:

   ```
   #memory_target=314572800
   sga_target=188743680
   pga_aggregate_target=125829120
   ```

2. Start database using parameter file (use full path to the file or make sure
   you are in the right working directory):

   ```
   startup pfile='initORCL.ora';
   ```

3. Save your settings to spfile:

   ```
   create spfile='spfileORCL.ora' from pfile='initORCL.ora';
   ```

4. Start your database as usual:

   ```
   startup;
   ```
