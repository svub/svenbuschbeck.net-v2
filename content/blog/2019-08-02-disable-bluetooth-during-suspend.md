---
title: "Laptop with insomnia"
date: 2019-08-02T13:36:14Z
description: "What to do when your laptop can't sleep? Is it teething perhaps? Bluetooth maybe?"
image: blog-sleep.jpg
tags:
  - Linux
  - Fedora
  - Bluetooth
---

# When your laptop wakes up during sleep

Running Fedora 29, my laptop had sleeping issues. It just kept waking up.
Poor laptop.
Trying with Airplane mode on it worked so it had to do something with wireless connections... I checked for wake-on-lan WOL: nope. Experimenting with turn on and off the Bluetooth setting "suspend with bluetooth headset", I noticed it was causing the laptop to wake up. Bingo, it's the Bluetooth module! Once the source was identified, which was the tricky part, the interwebs helped by offering a great solution:

I'm reproducing
[the brilliant solution form the Manjaro forum](https://forum.manjaro.org/t/laptop-wakes-from-sleep-if-bluetooth-is-enabled/50647)
here so you don't have to click.
But please give kudos on the forum!

Edit 2022: the forum article is gone, but here are the instructions. :)

## Solution

The solution is to create two script anduse them as a services. One is run before the laptop goes to sleep and it turns of Bluetooth, and the second does the inverse, restoring Bluetooth after waking up.

First, let's create the service turning off Bluetooth by createing `/etc/systemd/system/bluetooth-suspend.service` -- e.g. with `sudo vim` -- and enter:

```bash
[Unit]
Description=Bluetooth module suspend helper
Before=sleep.target

[Service]
Type=simple
ExecStart=-/usr/bin/bluetooth-suspend.sh

[Install]
WantedBy=sleep.target hibernate.target hybrid-sleep.target
```

And the actual script `/usr/bin/bluetooth-suspend.sh`:

```bash
#!/bin/bash
modprobe -r btusb
```

Then, the second part to re-enable Bluetooth `/etc/systemd/system/bluetooth-reload.service`:

```bash
[Unit]
Description=Reload bluetooth driver after system resumed
After=hibernate.target suspend.target hybrid-sleep.target

[Service]
Type=oneshot
TimeoutSec=15
ExecStart=/usr/sbin/modprobe btusb

[Install]
WantedBy=hibernate.target suspend.target hybrid-sleep.target
```

Finally, make the files executable, set ownership to root and enable the service:

```bash
sudo chmod +x /etc/systemd/system/bluetooth-reload.service
sudo chown root:root /etc/systemd/system/bluetooth-reload.service
sudo chmod +x /etc/systemd/system/bluetooth-suspend.service
sudo chown root:root /etc/systemd/system/bluetooth-suspend.service
sudo chmod +x /usr/bin/bluetooth-suspend.sh
sudo chown root:root /usr/bin/bluetooth-suspend.sh
sudo systemctl enable bluetooth-suspend.service
sudo systemctl start bluetooth-suspend.service
sudo systemctl enable bluetooth-reload.service
sudo systemctl start bluetooth-reload.service
```

You can test it right away. No reboot needed. :)

## Finding modules

I'm myself pretty much a Linux beginner but I got curious when applying this fix. 
I was wondering, how about also disabling WiFI so it doesn't drain the battery during sleep?
So I needed to find the WiFi module.
There are two options AFAIK, `lsusb` and `lspci`, to list USB and PCI devices.
If you're not sure which on is the right one, you can always try as see if you get something useful.
For example, `lspci -vvnn | grep -A 9 Network` listed the kernel module being used for my WiFi.
