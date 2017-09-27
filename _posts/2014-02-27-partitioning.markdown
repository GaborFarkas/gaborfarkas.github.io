---
layout: post
title: A map server partitioning scheme
date: 2014-02-27
description: "When you have a server machine and plan to run a dedicated Linux server, you should make some partitioning considerations first. For a mapserver you won’t have to make a very detailed partitioning scheme, but you may consider to build some partitions for the basic functions of your Linux server. If you have to deal with RAID disks or GPT partitioning then I assume you already know how to structure your server. The following thoughts will be about a normal sized mapserver."
comments: true
---
When you have a server machine and plan to run a dedicated Linux server, you should make some partitioning considerations first. For a mapserver you won’t have to make a very detailed partitioning scheme, but you may consider to build some partitions for the basic functions of your Linux server. If you have to deal with RAID disks or GPT partitioning then I assume you already know how to structure your server. The following thoughts will be about a normal sized mapserver.

### The swap

The swap partition is designed to be the swapping space of your Linux system. With optimal swap space your machine won’t slow down drastically, even if it runs out of physical memory. The optimal swap size is the double of the system memory. However, if you plan to extend your machine with additional memory, the swap partition should be double the size of the planned memory, so you won’t have to repartition your server after the extension causing remarkable offline time. The ideal place of the swap partition is between the data and the **/home** partitions.

### The root

The **/** directory is the root of your system. Everything that won’t get space on another partition goes on the root partition. An average map server won’t have hundreds of gigabytes of programs installed, so the **/usr** directory contrary to some special servers won’t have to be on a separate partition and a default 20 GB in size will be more than enough. If you plan otherwise, than you should consider making a partition for **/usr** or making a bigger root partition.

### The home

The **/home** contains the default settings and personal files of the users of a Linux system. This partition may take up to a lot of space depending on how many users will your server have. You have to guess the exact size based on the planned audience of your server.

### The variables

The default directory for the system variables on a Linux is the **/var**. It can contain a bunch of things from the e-mails and the web server contents to the system logs. You don’t have to separate the **/var** directory on a partition, but you have to deal with at least one sub-directory.

The **/var/log** is the place where your system stores the security and error logs. There are two aspects in placing this folder on a different partition than your root. The first is, that if someone other than an admin can access the system logs, it is a security issue. The second, that if your system gets in some sort of loophole, this log can grow at a rate of hundreds of megabytes per second and it can populate your root directory very quickly. There are some other important directories in the **/var**, but on a basic map server you won’t have to deal with them. However you should take in consideration, that the **/var/www** holds the content of a default Apache web server and the **/var/mail** holds the mailboxes of the users by default.

### Other directories

There might be some other directories you should consider depending on the use of the server. If you want to keep a nice little separate place for administrative use, you should keep the **/tmp** directory on a different partition.

For security reasons, especially if you have to fear from hackers, you may consider putting **/root** (the superuser’s home directory) and **/boot** (which is responsible for the successful booting sequence) on different partitions. The **/boot** partition can be about 20-50 megabytes big (depending on the distribution) and you should unmount it after booting to fulfil the partition’s purpose.

If you have really big and/or dynamically growing databases behind your map server, you might just consider keeping them on a separate partition with or without the web server content depending on your server. Every database management system (DBMS) has a default path for its content. This path can be modified with a variable or a symlink. Also, the default **/var/www** path of the Apache web server can be changed. They can easily point to a partition that isn’t defined in the Linux filesystem hierarchy standard, like **/data**.

### My map server partitioning scheme

My scheme is based on a basic map server serving tiles and features, without extraordinary databases and with relatively low traffic. I wouldn’t mess around with extra security settings, I just want to keep the number of partitions as low a possible. Unfortunately I can’t show you my scheme the stylish way with df, because my computer is mostly used as a workstation besides its partly server styled partitioning.

Mount point | Approx. size | Comment
---|---|---
**/** | 20GB | Root folder with the most system directories.
**/var/log** | 50GB | System logs. With monthly rotations, 50GB should be more than enough.
**/home** | 100-200GB | Home directories of the users. Maybe oversized if it only contains user preferences.
swap | 2x RAM | Between the data and the rest of the server for less needle movement and faster processing.
**/data** | rest of the disk | For every data the server has to create and serve.

