---
title: "Copying MongoDB from meteor.com"
date: 2014-07-19T13:36:14Z
description: "Want to port your running  Meteor app from meteor.com to your own VPS? Follow these steps to copy over the MongoDB data."
image: blog-database.jpg
tags:
  - Linux
  - Meteor
  - MongoDB
---
# Copying MongoDB from meteor.com

I started deploying my latest Meteor app [umeedoo.net (now defunct, leads to a portfolio page highlighting its features)](/portfolio/umeedoo-net "Umeedoo! ... better together.") to my own VPS and wanted to use the data from my beta system hosted at umeedoo.meteor.com.

First of all, I was surprised about how simple and easy it was to deploy using [Meteor Up (MUP)](https://github.com/arunoda/meteor-up "Meteor Up (MUP)"). Some weeks before, I spend an entire day on installing the Meteor environment on a Debian machine--now it takes less than 15 minutes! One caveat though, it did not work for me on Debian, I had to drop my previous Debian VM and replaced it with Ubuntu as MUP depends on Upstart and it seems rather tricky to replace Debian's SysVinit with Upstart. Okay, different story, but a biiig thanks to Arunoda for the great work on MUP!!

## So, how to db.copyDatabase(); the data from the original DB to yours?

The method signature is `db.copyDatabase("[app-name]_meteor_com", "[your-db-name]", "[meteor-mongo-domain]", "[username]", "[password]");`. 
For this example, let's assume "app" to be the app name. 
General approach: get the MongoDB URL, extract all the parameters above, log into your own MongoDB installation and use `db.CopyDatabase();` to move the data over.

All commands need to be executed on the same machine. (FYI, the username and password get automatically generated and it did not work to get the URL on my machine and use the username and password on the server... strange though). 

Thus, install Meteor on your server `curl https://install.meteor.com/ | sh`. Then, get the MongoDB URL `meteor mongo --url app.meteor.com`.
It will look something like this `mongodb://client-fd532e7d:683a9a4e-1604-5729-07fd-df1ba7dcbbf9@production-db-a2.meteor.io:27017/app_meteor_com`\

Inside this example URL, you can find all necessary parts:

-   username: `client-fd532e7d`
-   password: `683a9a4e-1604-5729-07fd-df1ba7dcbbf9`
-   meteor-mongo-domain: `production-db-a2.meteor.io:27017`

Start a MongoDB CLI by typing `mongo`.
In my case, the database created by the app and MUP was called "admin" (i.e. [your-db-name]="admin"). How to find yours? Use `show dbs` in the MongoDB CLI to see which one is yours.
Then write `use [your-db-name]` to switch to your DB.

And finally, using the data from above... 

```js
db.copyDatabase("app_meteor_com", "admin", "production-db-a2.meteor.io:27017", "client-2fbeb6ef", "1bd44ece-b3fa-7d1b-0046-83b917927f35");
```

... will copy the data over in a few seconds.
When I tried first, I got an error about a duplicate key (the deployed app had created some data already), dropping the entire DB fixed it. Also, the username and password are valid for a short time only, so maybe having two terminals open is a good idea.

Archived references: [Cloning MongoDB](https://web.archive.org/web/20190316234400/https://coderwall.com/p/i6qssg "Cloning MongoDB"), [Meteor dump](https://web.archive.org/web/20190316234400/https://gist.github.com/olizilla/5209369 "Meteor dump"), [Clone DB from meteor.com](https://web.archive.org/web/20190316234400/https://groups.google.com/forum/#!topic/meteor-talk/KvDWrqZpy-w "Clone DB from meteor.com"), [Copy DB from one server to another](https://web.archive.org/web/20190316234400/http://stackoverflow.com/questions/5495137/how-do-i-copy-a-database-from-one-mongodb-server-to-another "Copy DB from one server to another")