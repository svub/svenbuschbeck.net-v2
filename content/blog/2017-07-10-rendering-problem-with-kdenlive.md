---
title: "Rendering problem with Kdenlive"
date: 2017-07-10T13:36:14Z
description: "When Kdenlive fails to render very long video projects..."
image: blog-video-editing.jpg
tags:
  - Linux
  - KDE
  - video
  - video-editing
---
# Rendering problem with Kdenlive

I really enjoy using the Kdenlive, a video editor for KDE on Linux. I think it’s a simple, straight forward, and yet powerful tool.

But just during the last few days, I had troubles for the first time and could not find a solution. When rendering my project, it kept failing with `max_analyze_duration 5000000 reached at 5000000`. I searched online, the error might be related to the size of the audio (>1h) Still, the project rendered at first, but after the final cut--with lots and lots of cuts--I started getting this error, thus, out of a sudden, I was not able to get my final video file out anymore. Was I threatened to having to do the entire work again or what??

Finally, I found a solution today! Better, a workaround.

I split up the file by adding guides--in my case three, but the number might depend on the project size--and then used the render feature “Guide zone” (at the bottom of the render dialog). So, I rendered three parts and used melt to put them together like this:

```sh
melt input*.mp4 -consumer avformat:result.mp4 acodec=aac ab=160k vcodec=libx264 vb=3000k
```
I’m using x.264 and AAC here – but you can also drop all those parameters and let melt figure 
everything out – it’s pretty capable, give it a try.

```sh
melt input*.mp4 -consumer avformat:result.mp4
```

If you have ffmpeg on your system, you can merge the files using the copy mode, so no quality gets lost – see details [here](https://trac.ffmpeg.org/wiki/Concatenate). But even when using melt and thus re-encoding the video, you will not notice that it has been rendered in three parts and “melted” later. So I’m happy! Still a bit surprising that I could not find a solution online. So hey, hope this approach works for you too! 🙂