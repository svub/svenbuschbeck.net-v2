---
title: "Static Files with Meteor and Spiderable"
date: 2013-10-29T13:36:14Z
description: "Meteor basics: serving static files."
image: blog-error.jpg
tags:
  - Meteor 
  - JavaScript
  - Web
---
# Serving Static Files with Meteor and Spiderable

In short: To serve files which are not part of your project's code (i.e. which are supposed to be served without being compiled), put them in the `public` folder. This folder will be served from `/`.

Some more background and details: Trying to add a web-font to my project, I put it in `/client/webfonts/somefont.woff`. But the font didn't show up. I tested it with `wget -O- http://localhost:3000/webfonts/somefont.woff` ... and *surprise* I got the HTML of the default page--not some binary gibberish that you would expect to find in a font file.

All file types unknown to meteor get stripped out during compile time. Instead you need to put them in a separate folder called `public`--in my case in `/public/webfonts/somefont.woff`. Rookie mistake I guess. 🙂