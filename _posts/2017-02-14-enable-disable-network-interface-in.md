---
layout: post
title: Enable / disable network interface in Windows from command line
date: '2017-02-14T12:26:00.004+01:00'
author: Libor Nenadál
tags:
modified_time: '2017-02-14T12:26:37.891+01:00'
blogger_id: tag:blogger.com,1999:blog-17453343.post-8988449245745707864
blogger_orig_url: http://saxuality.blogspot.com/2017/02/enable-disable-network-interface-in.html
---

Disable interface:
```
netsh interface set interface "Local Area Connection" admin=disable
```

Enable interface:
```
netsh interface set interface "Local Area Connection" admin=enable
```
