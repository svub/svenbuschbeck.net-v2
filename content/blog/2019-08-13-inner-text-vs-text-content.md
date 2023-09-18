---
title: InnerText vs. textContent!
date: 2019-08-13T13:36:14Z
description: "They are not the same and why it's important to know the difference. Spoiler alert: textContent FTW!"
image: blog-coding.jpg
tags:
  - javascript
  - web-dev
  - web
---
# InnerText vs. textContent

There are some
[interesting differences](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#Differences_from_innerText)
between the two contestants.
Most noticeable IMO that `innerText` triggers a re-flow, thus, whenever possible use `textContent`.
And I found a surprising one on top:

```javascript
someNode.innerText =
  `some multi
  line text
  !`;
```

I would expect the `nodeValue` of `someNode` to have three lines, with line breaks and to be rendered as simple text in one line - ignoring line breaks as usual.

[But wait, try it!](https://jsfiddle.net/svub/zanLt037/3/)

Turns out, line breaks get converted into `<br>` tags!
Pretty weird and unexpected. The naming `innerText` is certainly misleading as it creates DOM elements.

But `textContent` to the rescue!
It behaves as expected: Line breaks? Yes. `<br>` tags? No!
Another reason for `textContent`.

**The final results for `innerText` vs `textContent` is 0:2 - `textContent` is the clear winner of this match.**
