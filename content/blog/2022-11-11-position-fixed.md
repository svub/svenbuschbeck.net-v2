---
title: "Position:fixed not working?"
date: 2022-11-11T16:52:06Z
description: "There are several CSS properties that break fixed positioning: transform, perspective, filter, and background-filter."
image: blog-coding.jpg
tags:
  - CSS
  - web-dev
  - web
---
# Position:fixed not working?

After working on the [hollow-white.de](https://hollow-white.de) web app for a while, I suddenly got problems with some overlays, that had worked perfectly fine before. The close button at the bottom of a layover, positioned with `position: fixed`,  was suddenly sticking to the layover content itself when scrolling down instead of staying fixed at the bottom of the screen as it should. Checking [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position), you need to avoid `transform`, `perspective`, and `filter`. Non of those were used in my code, but it gave me a hint and I found out through some time of trial and error, that also `background-filter` is breaking the positioning!

I assume, these limitations where put in place to improve rendering performance. But at the cost of very strange and unexpected behavior. Removing all attributes that break positioning can make creating layouts that also incorporate animations very challenging... and what's worse, messy, as you need to fiddle around with still making it work somehow. In my case, I was working on transitions between pages of the app and indeed needed `perspective`. So it required workarounds and substantially changes in the website's structure to make it work. 

Unfortunately, there's no generic approach to overcome this issue, but I hope this blog post at least helps with finding the cause. In my case, I solved the situation by taking the button out of the overlay, into a separate container and than combined two animations, one hiding the button, then adding `perspective` and then running the actual animation of showing and hiding the overlay with a 3D effect. By overlapping the animations, it was barely visible and works well.
