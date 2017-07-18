---
layout: post
title: Set / unset http(s) proxy in NPM, Atom, Yarn
date: '2015-12-10T10:52:00.000+01:00'
author: Libor Nenadál
tags:
modified_time: '2017-07-17T16:52:52.037+02:00'
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

[Atom](https://atom.io/) configuration is very similar:
```
apm config set proxy http://proxy.company.com:8080
apm config set https-proxy http://proxy.company.com:8080

apm config rm proxy
apm config rm https-proxy
```

[Yarn](https://yarnpkg.com/lang/en/) uses `delete` keyword for proxy removal:
```
yarn config set proxy http://proxy.company.com:8080
yarn config set https-proxy http://proxy.company.com:8080

yarn config delete proxy
yarn config delete https-proxy
```
