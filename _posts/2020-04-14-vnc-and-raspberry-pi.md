---
layout: post
title: "VNC and Raspberry Pi"
date: "2020-04-14 13:45:00 +0200"
---

I am using headless Raspberry Pi where steps were following:
1.  enable VNC Server using `sudo raspi-config` -> Interfacing Options -> VNC -> yes
2. start `vncserver -geometry 1440x900` (can be killed using `vncserver -kill :<display-number>`)

Guides used:
<https://www.raspberrypi.org/documentation/remote-access/vnc/>
<https://superuser.com/questions/184338/how-to-change-screen-resolution-of-vnc-server-without-restarting-it>
