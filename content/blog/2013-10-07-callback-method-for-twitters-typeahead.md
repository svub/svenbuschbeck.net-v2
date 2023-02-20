---
title: "Twitter Typeahead callback"
date: 2013-10-29T13:36:14Z
description: "Switching from Bootstrap Typeahead to Twitter Typeahead."
image: blog-error.jpg
tags:
  - Meteor 
  - JavaScript
  - Web
---
# Callback Method for Twitter's Typeahead

When you start using Twitter's Typeahead widget, e.g. because you switched from Bootstrap 2.3 to 3.0, you will notice that it is NOT a simple drop-in replacement for Bootstrap's original Typeahead!

Before, you generated the suggestions shown to the user by implementing a callback method while creating the Typeahead like this:

```js
$(field).typeahead({
  source: function(query, process) {
    ... return a list of suggestions (see doc for details)
  }
});
```

Since version 3, Bootstrap does not provide its own Typeahead any more, instead it is using Twitter's own implementation which seems to be a good choice at least on the long run. But it does not provide any mean for defining a callback method to provide the suggestions --- no clue why.\
Instead you can provide a predefined array locally, a predefined array that will be loaded on start-up, or a remote service defined by a URL.\
You will find several good examples of why you need a callback method sometimes.

-   You want/have to use a Javascript library to access the service.
-   There is no database for the suggestions, they a generated on the fly, e.g.if you want to suggest sentence completion while the user types.
-   You are using Meteor's collections holding your suggestions, thus, there is no URL you could point to.

But taking a look into the internals revealed following solution: completely by-pass the internal suggestion aggregation of Twitter's typeahead by replacing the `getSuggestions(query, callback)` method of the first dataset, which we defined by `local: [];`.

(t = $("field")).typeahead({ local: [] });
t.data("ttView").datasets[0].getSuggestions = function(query, callback) {
  var suggestions = ... gather your suggestions here ...
  var data = [];
  for (suggestion in suggestions) { data.push(this._transformDatum(suggestion)); }
  callback(data)
}

(Translated from Coffeescript on-the-fly -- consider as a draft than an out-of-the-box solution.)

Happy hacking. 🙂

p.s. for Meteor users: The callback breaks each time the template gets re-rendered -- despite that you use the package `preserve-inputs` or `<#constant>` due to a [bug](https://web.archive.org/web/20180126032615/https://github.com/meteor/meteor/issues/1301 "Details on the Meteor issue"). Somehow, constant areas and that particular package do not get along with each other. Solution: removed the package and use constant areas around typeahead input fields works. This should be fixed as soon as the [new template engine](https://web.archive.org/web/20180126032615/https://github.com/meteor/meteor/wiki/New-Template-Engine-Preview "Meteor's new, advanced template engine") gets rolled out.