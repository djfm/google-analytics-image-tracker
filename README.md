# google-analytics-image-tracker

# Random notes while I'm developing

## heroku-postbuild

If I need to do something specific to build the project
on heroku, I can add a `heroku-postbuild` script
int the "scripts" entry in `package.json`.

See the doc on [heroku](https://devcenter.heroku.com/articles/nodejs-support#specifying-a-node-js-version);
## setting environment variables on heroku

```
heroku config:set MY_CUSTOM_VALUE=foobar
```

Also, [RTFM](https://devcenter.heroku.com/articles/nodejs-support#specifying-a-node-js-version);

## If eslint doesn't seem to work

Run it manually to have more info, in our case:

```
yarn eslint src
```
