---
title: "Match.Optional for null"
date: 2014-02-11T13:36:14Z
description: "Strangely, Meteor's 'Match.Optional' is failing on 'null' values... and how to fix that."
image: blog-coding.jpg
tags:
  - Meteor
  - MongoDB
  - CoffeeScript
---
# Match.Optional for null

Securing my Meteor app, I came across a strange quirk of `Match.Optional` from the "check" package.
Here an example in CoffeeScript:

```cs
Meteor.methods
  test: (x) -> check x, Match.Optional String
```

I expected the match to be successful when calling the method like this:

```cs
Meteor.call 'test', undefined
```

But instead, I got a `Match failed` exception. After debugging for a bit, it turned out that the `undefined` becomes a `null` when it arrives on the server. 
Which is odd, of course--but also annoying as the `check x, Match.Optional String` fails for `null` (only `undefined` or `String` are acceptable).
To overcome this, I had to write up my own variation of `Match.Optional`. 
Here is the new `Match.OptionalOrNull` that does the trick:

```cs
Match.OptionalOrNull = (pattern) -> Match.OneOf undefined, null, pattern
```

The name is lousy, okay. An alternative would be to override the original method, but that's bad practice of course. But apart that I keep wondering: what's the purpose of making `Match.Optional` fail on `null` in the first place?