---
title: "Recovering deleted photos"
date: 2015-04-16T13:36:14Z
description: "Shit happens... but for Linux users, there is a power tool straight from the US Air Force called 'foremost' to help you recover (aka undelete) your photos easily!"
image: blog-erase.jpg
tags:
  - Linux
  - recovery
  - photos
---
# Recovering deleted photos

Shit happens... but for Linux users, there is a power tool straight from the US Air Force called "[foremost](http://foremost.sourceforge.net/)" to help you recover (aka undelete) your photos easily!
Note: you’ll need sudo rights to install this software tool.

But most importantly: do not write any new data to your device (SD card, flash drive or whatever)! Otherwise, you’ll overwrite what is still there and lose your photos forever.

The steps:
Remove or unplug the media/drive/card from your comupter.
Open a terminal window.

Install the recovery software. On Debian, Ubuntu or Mint that would be:

```sh
sudo apt-get install foremost
```

Create a folder to put the recovered photos in. *Important: don’t put this forler on the drive where you want to recover photos from! See above...*

```sh
mkdir recovered-photos && cd recovered-photos
```

Find the device: copy the following command to your terminal and press the `Tab` key twice

```sh
foremost -v -t jpg /dev/sd
```

It will say something like this

```sh
sda   sda1  sda2  sda3  sda4  sda5  sda6  sdb
```

Now, plug in your drive/card/medium and press `Tab` again, twice.
It should change to something like this

```sh
sda   sda1  sda2  sda3  sda4  sda5  sda6  sdb  sdc  sdc1
```

In my case `sdc` and `scd1` showed up. Thus, `sdc1` is the partition on the device to recover from. Thus, I my case the full command would be the following. *Note: You need to replace `sdc1` with whatever showed up previously on your own terminal!*

```sh
foremost -v -t jpg /dev/sdc1
```

... press return and see the magic happen! Your photos will show up in a subfolder of recovered-photos. 🙂