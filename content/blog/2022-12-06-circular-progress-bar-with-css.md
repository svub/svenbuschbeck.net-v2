---
title: Pure* CSS circular progress bar
date: 2022-12-06T16:12:32Z
description: "Using only variables, clipping, and transformations. *and a little helper class. ;)"
image: blog-ui.jpg
tags:
  - CSS
  - web
---

# A pure* CSS, configurable circular progress bar. Yep.

*Using only variables, clipping, and transformations... \*and a little helper class. ;)*

There are several examples and implementations out there. I merged and optimized. And added simple variables so you can reuse and configure the indicator to your likings.

The HTML is minimal
```HTML
<div class="progress" id="the-progress-bar">
  <div class="circle"></div>
  <div class="circle right"></div>
</div>
```

Update the progress bar: 1 find it, 2 set a helper for when you cross over 50%, 3 convert the progress (a value between 0 and 1 where 1 means 100%) to degrees, and 4 set this value to the `--progress` property.
```js
function setProgress(progress, id) {
  const bar = document.getElementById(id);
  bar.classList.toggle('beyondHalf', progress > 0.5)
  progress = `rotate(${360 * progress}deg)`;
  bar.style.setProperty('--progress', progress);
}

setProgress(0.75, "the-progress-bar")
```

The gist of how the CSS works: using the two `.circle` boxes, both with rounded corners so that they become circles. Applying a border to them and using clipping to just show a part of it, which is visualizing the progress by rotating the boxes. Once progress passes 50%, a helper class `.beyondHalf` is used to remove the clipping, showing the box on the right with a full 180° circle and letting the box on the left continue showing the progress. 
```CSS
.progress {
  --color: #f80;
  --diameter: 80px;
  --thickness: 4px;
  --progress: rotate(0deg);
  
  width: var(--diameter);
  height: var(--diameter);
  position: absolute;
  clip: rect(0px, var(--diameter), var(--diameter), calc(var(--diameter) / 2));
}

.circle {
  width: calc(var(--diameter) - (2 * var(--thickness)));
  height: calc(var(--diameter) - (2 * var(--thickness)));
  border: var(--thickness) solid var(--color);
  border-radius: calc(var(--diameter) / 2);
  position: absolute;
  clip: rect(0px, calc(var(--diameter) / 2), var(--diameter), 0px);
  will-change: transform;
  transition: transform 300ms;
  transform: var(--progress);
}

.beyondHalf {
  clip: rect(auto, auto, auto, auto);
}

.beyondHalf .circle.right {
  transform: rotate(180deg);
}
```

See it live in action with all the CSS, JavaScript, and HTML in this [demo here](https://jsfiddle.net/svub/z85Lc6bx/). 

