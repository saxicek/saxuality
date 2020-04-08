---
layout: post
title: "Using Raspberry Pi 4 as an access point to share an internet connection (bridge)"
date: "2020-04-08 08:40:00 +0200"
---

Use the following to update your Raspbian installation:

    sudo apt update
    sudo apt upgrade

If an updated kernel was installed, reboot before continuing with the setup.

    sudo reboot

One common use of the Raspberry Pi as an access point is to provide wireless connections to a wired Ethernet connection, so that anyone logged into the access point can access the internet, providing of course that the wired Ethernet on the Pi can connect to the internet via some sort of router.

To do this, a 'bridge' needs to put in place between the wireless device and the Ethernet device on the access point Raspberry Pi. This bridge will pass all traffic between the two interfaces. Install the following packages to enable the access point setup and bridging.

    sudo apt install hostapd bridge-utils

Bridging creates a higher-level construct over the two ports being bridged. It is the bridge that is the network device, so we need to stop the eth0 and wlan0 ports being allocated IP addresses by the DHCP client on the Raspberry Pi.

Use `sudo nano /etc/dhcpcd.conf` to add following to the end of the file (but above any other added "interface" lines) and save the file.

    denyinterfaces wlan0 eth0

Add a new bridge, which in this case is called "br0".

    sudo brctl addbr br0

Connect the network ports. In this case, connect "eth0" to the bridge "br0".

    sudo brctl addif br0 eth0

Now the interfaces file needs to be edited to adjust the various devices to work with bridging. Use `sudo nano /etc/network/interfaces` to add the bridging information at the end of the file.

    auto br0
    iface br0 inet manual
        bridge_ports eth0 wlan0
        post-up iptables -A FORWARD -p all -i br0 -j ACCEPT

Notice the `post-up` - it adds iptables rule to allow packet forwarding for the bridge. If your default FORWARD policy is DROP (check with `sudo iptables -L -nv`) then br0 won't be able to pass traffic between eth0 and wlan0. As a result you will be connected to AP but won't get IP address from DHCP server.

Create the `/etc/hostapd/hostapd.conf` file, add "bridge=br0" below the "interface=wlan0" line, and remove or comment out the driver line. The passphrase must be between 8 and 64 characters long.

To use the 5 GHz band, you can change the operations mode from 'hw_mode=g' to 'hw_mode=a'. The possible values for hw_mode are:

    a = IEEE 802.11a (5 GHz)
    b = IEEE 802.11b (2.4 GHz)
    g = IEEE 802.11g (2.4 GHz)
    ad = IEEE 802.11ad (60 GHz)

`/etc/hostapd/hostapd.conf`:

    interface=wlan0
    bridge=br0
    #driver=nl80211
    ssid=NameOfNetwork
    hw_mode=g
    channel=7
    wmm_enabled=0
    macaddr_acl=0
    auth_algs=1
    ignore_broadcast_ssid=0
    wpa=2
    wpa_passphrase=AardvarkBadgerHedgehog
    wpa_key_mgmt=WPA-PSK
    wpa_pairwise=TKIP
    rsn_pairwise=CCMP

Now unmask hostapd and reboot the Raspberry Pi

    sudo systemctl unmask hostapd
    sudo reboot

Troubleshooting
---------------
If there are any errors in the hostapd.conf file the hostapd service may fail to start.
In this case it can be helpful to start hostapd from the command line with the following command:

    sudo hostapd -B /etc/hostapd/hostapd.conf

Acknowlegments
--------------
This guide is based on forum post <https://www.raspberrypi.org/forums/viewtopic.php?p=1510898&sid=c671765d5196511a8e72fc13e3fc2f96#p1510898> with some minor modifications.
