---
layout: post
title: "Replace Disks in Synology"
date: "2018-07-11 10:54:23 +0200"
---

I needed to replace a disk in Synology DiskStation with a bigger one. I don't
use any RAID mirroring so I cannot just remove one disk, replace with a bigger
one and wait until data is copied by RAID. I also have 2 bays only and want to
replace the disk without the system. Which means I cannot boot Synology with old
small disk and new bigger disk. So I had to connect the 2 disks to my PC, boot
up live Ubuntu 16 from USB and perform copy there. Steps were as following:

# In Synology DiskStation
1. Switch off DiskStation, remove small disk and replace it with bigger one.
2. Start DiskStation and initialize new disk in Storage Manager. I created
   *Storage Pool for better performance* and *Basic* RAID type.
3. Switch off DiskStation and remove new disk so that you can connect both old
   and new disk to a PC with Ubuntu.

# In PC with Ubuntu

1. Switch to root to avoid typing sudo for every command:

   ```
   sudo su -
   ```

2. Check connected disks:

   ```
   fdisk -l
   ```

3. Update package information:

   ```
   sudo apt-get update
   ```

4. Install mdadm:

   ```
   sudo apt-get install mdadm
   ```

5. Check the automatically generated /etc/mdadm/mdadm.conf. In my case the 2
   disks were mapped to the same /dev/md/3 which caused errors later:

   ```
   vi /etc/mdadm/mdadm.conf
   ```

6. Assemble software RAIDs:

   ```
   mdadm -As
   ```

7. (optional) If the disks are using Synology Hybrid RAID (SHR):

   ```
   vgchange -ay
   ```

8. Mount disks:

   1. Basic RAIDs can be mounted using `/dev/md/*`:

      ```
      mount /dev/md/3 /mnt/new`
      ```

   2. SHR disk needs to mount volume group:

      ```
      mount /dev/vg1001/lv /mnt/old
      ```

9. Use rsync to copy files:

   ```
   rsync -aHAX --delete --info=progress2 /mnt/old/ /mnt/new/
   ```

This guide was inspired by:

<https://superuser.com/questions/1017923/migrate-non-redundant-data-to-larger-disk-on-synology-nas>

<https://unix.stackexchange.com/questions/118883/basic-rsync-command-for-bit-identical-copies>
