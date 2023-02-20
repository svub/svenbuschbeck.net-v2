---
title: "Easily scaling images for the web"
date: 2013-12-26T13:36:14Z
description: "Want to send an image by mail but it's sooo large? Let's write a small script that can scale down images right inside of the file manager."
image: blog-weight.jpg
tags:
  - Linux
  - Shell
  - Bash
  - web
---
# Scaling images for the web--easily and quickly

Starting Gimp just to scale down some photos to send them by mail? Meh. 
How about mark them, right-click, "Send To" -> "Scale for web"?
That would be nice. 
Let's code it!

First, get a tool to scale images:

```sh
sudo apt-get install imagemagick
```

Now, create a script that takes a list of images as input, scales them down, and stores them with a prefixed file name. Go!

```sh
#!/bin/bash
pwd > ~/f0.txt
echo "$@" > ~/f1.txt
for file in $@
do
	convert "$file" -quality 50 -resize 1024x768 "${file%/*}/web-${file##*/}"
done
```

Make sure to `chmod +x` the script file we just created.
Next, let's integrate it into "Send To". This is an example for Thunar on XFCE.
Create a `.desktop` file in the `sendto` folder, e.g. `/usr/share/Thunar/sendto/scale-for-web.desktop` with following content:

```sh
# Scale images for the web
[Desktop Entry]
Type=Application
Version=1.0
Encoding=UTF-8
TryExec=scale-for-web
Exec=scale-for-web %F
Icon=
Name=Scale for the web
MimeType=image/jpeg;image/jpg;image/png
```

Replace both `scale-for-web` with the name you gave to your script file. Is the script's folder in `$PATH`? No idea? Then just put the entire path+filename.

Now, open Thunar, select some images (Jpeg or Png), right-click, "Send To" -> "Scale for the web", wait a few seconds and you'll see `web-....jpg` files appearing in the same folder. 🙂

Archived references: [how to scale images with imageMagick](https://web.archive.org/web/20180126042931/http://www.howtogeek.com/109369/how-to-quickly-resize-convert-modify-images-from-the-linux-terminal/ "About ImageMagick"), [extract path segments](https://web.archive.org/web/20180126042931/http://stackoverflow.com/questions/965053/extract-filename-and-extension-in-bash "How to extract path segments."), [more details on string manipulation](https://web.archive.org/web/20180126042931/http://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html#Shell-Parameter-Expansion "Bash's Parameter Expansion")