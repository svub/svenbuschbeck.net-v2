---
title: "Jest and WebCrypto"
date: 2023-02-20T21:09:42Z
description: "Surprising errors testing some crypto.subtle based functions with Jest: TextEncoder, TextEncoder, and subtle not defined?"
image: blog-error.jpg
tags:
  - WebCrypto 
  - JavaScript
  - Web
---
# The battle of making Jest test methods on WebCrypto

Using the secure context WebCrypto at `window.crypto.subtle` offers a lot of powerful and fast cryptography functions directly in your browser. How about some asymmetric encrypting por favor? ¡Si, no problemo!

But how about testing the methods before using the in production? Sure, with Jest... *Not so fast!*

Using `window.crypto.encrypt(algorithm, key, data)` you'll notice that `data` is a `BufferSource` -- but my data is a string so the `TextEncoder` comes in handy turning a string to an array with `new TextEncoder().encode(data)`. But look, what's that?

```bash
ReferenceError: TextEncoder is not defined
```

Using the interwebs got me to this [StackOverflow post](https://stackoverflow.com/questions/57712235/referenceerror-textencoder-is-not-defined-when-running-react-scripts-test), it turns out "jsdom" -- the feature set used by Jest -- does not include `TextEncoder` and `TextDecoder`. Say what? After a few minutes of looking around for a bit, it's still unclear to me why. Let's focus on fixing it. The clean solution that worked for me:

I created a little shim file, called it `jest-shim.js`, and put it in my `tests` folder. It's loading the two missing classes from Node's `util` lib and exposes them on `global` so that they are available while running the tests in the Jest environment.

```js
import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
```

Next, I edited `jest.config.js` to tell it about that file by adding one extra line:

```js
setupFiles: ['<rootDir>/tests/jest-shim.js'],
```

But look at this, the next one!

```bash
TypeError: Cannot read properties of undefined (reading 'subtle')
```

Looking around online didn't bring up much, but again this [StackOverflow post](https://stackoverflow.com/questions/52612122/how-to-use-jest-to-test-functions-using-crypto-or-window-mscrypto) gave me an idea: for whatever reason, the `WebCrypto` object is also not available as it would be in the browser. But now we know what to do... So back to the `shim` file, Robin! Let's add a few lines:

```js
import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

Object.defineProperty(globalThis, 'crypto', {
  value: require('crypto').webcrypto,
});
```

With these, the encoders and decoders as well as `crypto` object are in place. Hope it helps for more people to start using WebCrypto. It has so much potential when it comes to creating web3 apps that rely on shared or local storage and want to share data in a secure way. If you want to learn more about WebCrypto, [MDN is a good place to get started](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto).
