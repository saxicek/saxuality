---
layout: post
title: Set / unset http(s) proxy in NPM
date: '2015-12-10T10:52:00.000+01:00'
author: Libor Nenadál
tags:
modified_time: '2015-12-10T10:52:52.037+01:00'
blogger_id: tag:blogger.com,1999:blog-17453343.post-8760081800353914753
blogger_orig_url: http://saxuality.blogspot.com/2015/12/set-unset-https-proxy-in-npm.html
---

Sometimes you are not directly connected to the Internet. Following commands are used to setup HTTP and HTTPS proxy in NPM:
```
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

To unset the configuration run:
```
npm config rm proxy
npm config rm https-proxy
```
