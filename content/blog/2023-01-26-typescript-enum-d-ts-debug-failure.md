---
title: "Typescript enums 'Debug Failure.'"
date: 2023-01-26T19:34:42Z
description: "Error messages are great, they help us find the cause of the problem. This one isn't. Not at all. If you're seening this one, check if you have an enum in your d.ts file..."
image: blog-error.jpg
tags:
  - Typescript
  - web-dev
  - web
---

# Error: Debug Failure. Output generation failed

**TL;DR:** You cannot put `enums` in `d.ts` files.

 While compiling Typescript, I got this beautiful error message "Error: Debug Failure. Output generation failed" in a `d.ts` file. What could it mean? Hmmm. Debug failure, you're telling me, eh? 

Try looking that up on the interwebs. Not much. Not surprising, the message is vague, to say the least.

So I'm trying a bit this and that, commenting in and out some of the things. And refinally, renaming the the `d.ts` file back to `.ts` and you won't believe it, now it works! Hmmmm. So what changed in that file, it looked fine to me, the editor doesn't complain, actually, everything looks just dandy. 

Time for backtracking! Git to the rescue, what did I change that made it stop working? Aha, an `enum` in a `d.ts` file. Doesn't seem to bother my editor, no little red squiggly line complaining about the `enum`. Unfortunately. Because yes indeed, searching for "can I put enum in d.ts file" returns [this](https://stackoverflow.com/questions/62109542/enums-in-typescript-d-ts-file) and the answer is:  No, you can't. 

While this is fine, thinking about it, because `enums` become real objects after compiling while types just disappear, so yes, putting them in a `d.ts` file won't work because they will not become part of your code. Okay, so much about why it fails, but hey, seriously, this message...

```bash
ERROR in ./src/types/results.d.ts
Module build failed (from ./node_modules/ts-loader/index.js):
Error: Debug Failure. Output generation failed
    at Object.transpileModule (...
```

... is--how to put it--not quite as delightful as it could be if somebody would have added a little hint about what the actual problem is. You know, just a little something so that one can fix it. Suggestion: "Enums are not allowed in d.ts files." Yes, something like this would have been sweet, real nice. Yes, I'm looking at you Typescript dev at Microsoft...