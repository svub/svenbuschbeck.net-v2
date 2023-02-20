---
title: "MongoDB fails starting Meteor"
date: 2013-11-21T13:36:14Z
description: "How to 'unlock' a MongoDB instance that didn't stop properly before."
image: blog-error.jpg
tags:
  - MongoDB
  - Meteor
  - JavaScript
---
# MongoDB fails when starting Meteor

If you're seeing this one when starting Meteor: 
```sh
Unexpected mongo exit code 100. Restarting.
Can't start mongod
MongoDB had an unspecified uncaught exception.
```

Check if MongoDB is running already. If not, check if you can find a file called `.meteor/local/db/mongod.lock`. It means that MongoDB did not stop properly last time. Just deleting this lock file should fix it. It's a bit unfortunate that the error message doesn't give any hint in this direction.