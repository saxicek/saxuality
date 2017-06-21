---
layout: post
title: SSH issues with Atlassian SourceTree on Windows
date: '2016-06-04T19:41:00.000+02:00'
author: Libor Nenadál
tags:
modified_time: '2016-06-04T19:44:14.239+02:00'
blogger_id: tag:blogger.com,1999:blog-17453343.post-6781175462773163986
blogger_orig_url: http://saxuality.blogspot.com/2016/06/ssh-issues-with-atlassian-sourcetree-on.html
---

If your Git repository configured over SSH fails with:

```
FATAL ERROR: Server unexpectedly closed network connection
```

Check your sshd server security settings. I found out that `MACs hmac-sha1` is
required by SourceTree.

I am using Synology and when setup with high security level of algorithms
SourceTree cannot negotiate connection (while Putty/Plink normally works). Check
your `/var/log/auth.log` - mine has folloging errors:

```
sshd[23561]: fatal: ssh_dispatch_run_fatal: no matching MAC found [preauth]
```
