---
title: "Linux server forwarding mails"
date: 2014-09-25T13:36:14Z
description: "How to setup up your Linux server to forward incoming emails to you."
image: blog-mail.jpg
tags:
  - Linux
  - mail
  - mail-forwarding
---
# Setting up a linux server to forward all incoming mails

Typical thing when having a new site up: you want to get whatever@yourdomain.com to end up in you normal inbox, say Gmail. Usually, websites selling domains offer this feature as a service. But if you find yourself in the situation to go all manual, here are the steps.

*Note: This guide is written for Debian-based distros. If you are logged in as root, you do not need to use “sudo” in front of each command.*

## Preparations
It’s recommended to have a user account to receive the mail other than root.
So either choose a user you have created already or create a new one:

```sh
sudo adduser [username]
```

Does your provider require you to use an SMTP relay? (check the documentation, or ask). You need to know this to continue.

## Install postfix
Postfix is a software package, a MTA, it handles incoming mail and forwarding.

```sh
sudo apt-get install postfix
```

And answer all configuration questions as below, replace [...] with your domain:

Server configuration type: If you use an SMTP relay, choose "Internet with smarthost", otherwise "Internet".

| Question | Configuration |
| -------- | ------------- |
| `System mail name` | [yourdomain.com] (no subdomains) |
| `SMTP relay host` | [smtp.yourprivider.com] (only showing if you chose “Internet with  |smarthost”)
| `Root and postmaster mail recipient` | The name of the user created/chosen before (not root) |
| `Other destinations to accept mail for` | keep the suggested defaults and add in front  |[yourdomain.com] and a space
| `Force synchronous updates on mail queue` | no |
| `Local networks` | keep suggested |
| `Use procmail for local delivery?` | yes |
| `Mailbox size limit` | 0 |
| `Local address extension character` | + |
| `Internet protocols to use` | all |

## Manual configuration
Edit `/etc/postfix/main.cf` (e.g. with `sudo nano ...`) add following two lines to the end:

```sh
virtual_alias_domains = [yourdomain.com]
virtual_alias_maps = hash:/etc/postfix/virtual
```

Create/edit `/etc/postfix/virtual` and add:

```sh
@[yourdomain.com]    [your.email.address@somewhere.com]
```

Finally, after editing this file run:

```sh
sudo postmap /etc/postfix/virtual
```

so that postmap actually applies your changes.

## Notes
If you forward to Gmail, do not use the same address to send test mails that the mails will be forwarded to--Gmail will silently ignore/delete mail where the sender and recipient are the same and you will think the forwarding does not work. How do I know? Don't ask. 😅
