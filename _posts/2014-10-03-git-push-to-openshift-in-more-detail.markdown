---
layout: post
title: Git push to OpenShift in more detail
date: '2014-10-03T12:02:00.000+02:00'
author: Libor Nenadál
tags:
modified_time: '2014-10-03T12:02:31.485+02:00'
blogger_id: tag:blogger.com,1999:blog-17453343.post-8053519408719640218
blogger_orig_url: http://saxuality.blogspot.com/2014/10/git-push-to-openshift-in-more-detail.html
---

Ever wondered what happens when you push your changes to OpenShift? Here is the
sweet secret - OpenShift runs:

```
gear deploy
```

Now you can retry execution of your push if something failed on the way. For
further information about build process you can also check documentation -
<http://openshift.github.io/documentation/oo_cartridge_developers_guide.html#openshift-builds>.
