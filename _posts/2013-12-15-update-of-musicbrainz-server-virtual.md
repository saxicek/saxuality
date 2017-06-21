---
layout: post
title: Update of MusicBrainz Server Virtual Machine III
date: '2013-12-15T23:00:00.001+01:00'
author: Libor Nenadál
tags:
modified_time: '2013-12-15T23:00:22.071+01:00'
blogger_id: tag:blogger.com,1999:blog-17453343.post-980296768122153408
blogger_orig_url: http://saxuality.blogspot.com/2013/12/update-of-musicbrainz-server-virtual.html
---

Once again I tried to update my Musicbrainz virtual machine image to version 2013-12-09 and experienced errors (again). Following are high level step which may help you to overcome the issues:

- Dependencies changed. Running recommended `cpanm --installdeps --notest .`
  fails with error on some dependencies. Check the errors and install
  dependencies manually with `cpanm`. For example
  `cpanm Apache::LogFormat::Compile`.

- Old way of server startup `carton exec -- plackup -Ilib -r` does not seem to
  be working any more. Use `plackup -Ilib -r` instead.
