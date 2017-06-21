---
layout: post
title: Subliminal on Synology
date: '2017-01-09T16:02:00.000+01:00'
author: Libor Nenadál
tags:
modified_time: '2017-01-09T16:02:13.457+01:00'
blogger_id: tag:blogger.com,1999:blog-17453343.post-153020968010857553
blogger_orig_url: http://saxuality.blogspot.com/2017/01/subliminal-on-synology.html
---

In order to install [Subliminal](https://github.com/Diaoul/subliminal) subtitle
downloader to Synology, you need to have SSH access (see
<https://www.synology.com/en-global/knowledgebase/DSM/help/DSM/AdminCenter/system_terminal>)
and [Python
installed](https://www.synology.com/en-us/dsm/app_packages/PythonModule). Then I
suggest to create separate user - i.e. `subliminal` and install subliminal under
this user. Steps are as follows:

1. Once logged as `admin` change to `subliminal` user:
   ```
   sudo su - subliminal -s /bin/bash
   ```

2. Get virtualenv:
   ```
   wget https://github.com/pypa/virtualenv/archive/15.1.0.tar.gz
   ```

3. Unpack virtualenv:
   ```
   tar xzf virtualenv-15.1.0.tar.gz
   ```

4. Create new Python environment:
   ```
   python virtualenv-15.1.0/virtualenv.py env
   ```

5. Install Subliminal:
   ```
   ./env/bin/pip install subliminal
   ```

Now Subliminal is installed and you can run it from location
`~subliminal/env/bin/subliminal`. You can schedule it as a task as detailed
[here](https://github.com/SynoCommunity/spksrc/issues/2357).
