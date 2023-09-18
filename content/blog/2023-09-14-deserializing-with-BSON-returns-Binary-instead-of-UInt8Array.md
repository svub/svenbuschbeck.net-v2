---
title: "Make the BSON return UInt8Arrays"
date: 2023-09-14T13:36:14Z
description: "BSON is a great tool to serialize anything in Javascript. Including binary stuff. But why does it return a Binary when deserializing what was originally a UInt8Array. And what to do about it?"
image: blog-bison.jpg
tags:
  - javascript
  - serialization
  - node.js
  - BSON
---
# BSON returns Binary when deserializing what was originally a UInt8Array. But Why?

I've been working on a module to persist the Pinia store for Vue.js - there are a few, but I want one that works for sync and async storage - localStorage and IndexedDB for example.

While working on that, I noticed serialization issues when storing objects directly into `localStorage`. So I started using JSON and it worked pretty well until I needed to serialize AND deserialize `UInt8Arrays`. So BSON for the rescue! 

Not so fast! For reasons unknown to me and mankind, BSON by default thinks deserializing an `UInt8Array` as something that looks veeery similar but is of type `Binary` is fine and dandy. But it's not.

Psst: it might have to do that BSON was made for Node.js, and not for client-side use. But that's where I want to use it.

Because I was running into issues working on [IPFS](https://ipfs.tech/) stuff serializing private keys and what not. I was using the [web3.storage](https://web.storage) interface and it for sure what not happy with getting a `Binary` instead of an `UInt8Array`. 

What to do?

Idea one: convert it. Yes that works. Something like this:
```ts
const object = BSON.deserialize(data);
const array = new UInt8Array(Buffer.from(object.array.buffer));
```
Note: I don't remember exactly because I deleted the code before writing this. Why? Because you don't need it! So forget it. :D

This was just a little writer's trick to create suspense which of course  is pretty useless now with all that explaining I did. Okay. Moving on!

After playing around with the configuration options of BSON, there is a way to convince BSON to just return the array type it got. 

So here it is, the magic line, behold!
```ts
BSON.deserialize(data, { promoteBuffers: true });
```

Promote buffers! Yes! Promote whatever you like but give me an `UInt8Arrays` when I gave you one and all will be good. Thank you. :D