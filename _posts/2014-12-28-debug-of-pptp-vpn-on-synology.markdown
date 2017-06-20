---
layout: post
title: Debug of PPTP VPN on Synology
date: '2014-12-28T11:52:00.000+01:00'
author: Libor Nenadál
tags:
modified_time: '2014-12-28T11:52:26.422+01:00'
blogger_id: tag:blogger.com,1999:blog-17453343.post-1034014857182882520
blogger_orig_url: http://saxuality.blogspot.com/2014/12/debug-of-pptp-vpn-on-synology.html
---

Recently my VPN connection between 2 Synology machines stopped working. This
article can help you get some more detailed information on what is happening in
the system.

1. PPTP client configuration is stored in `/usr/syno/etc/synovpnclient/pptp`.
There are several files, my options file was named `options_p1419626836.pptp`

2. You can connect PPTP manually with additional logging using command `pon
connect_p1419626836 debug dump logfd 2 nodetach`. Please note that you have to
replace `connect_p1419626836` with the name of your configuration.

3. When connecting you can inspect system logs using command `tail -f
/var/log/messages`. Press Ctrl+C to exit.

4. To inspect packets transferred between client and server run `tcpdump -i eth0
-w my.tcpdump -s 0 tcp port 1723 or proto 47`. You can check the log using
command `tcpdump -r my.tcpdump`. I recommend to run this command on both client
and server machine. You can then verify if all packets reached their
destination.

In my case I realized that GREv1 packets sent by server were not delivered to
client. When I restarted my router, issue disappeared.
