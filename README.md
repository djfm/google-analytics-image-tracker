# google-analytics-image-tracker

# Random notes while I'm developing

## If eslint doesn't seem to work

Run it manually to have more info, in our case:

```
yarn eslint src
```

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

## heroku setup for `yarn` 2

My app won't build. I logged into the app and saw that the .yarn/cache directory was empty.
That's abnormal, because it is committed.

Apparently there are some steps to do to enable `yarn` 2 on heroku.

I'm following heroku's guide on [migrating to yarn 2](https://devcenter.heroku.com/articles/migrating-to-yarn-2).

I'll write here the steps I took, and if, in the end, it worked.

First I had to install a plugin for the heroku CLI:

```bash
heroku plugins:install heroku-builds
```

Then I cleared the cache of my app:

```bash
heroku builds:cache:purge --app ga-img-tracker-pr-br-main
```

Then I skipped the part about Plug'n'Play, which I don't use
as it is not supported by enough tools yet and I constantly
run into problems with it.

I use `nodeLinker: node-modules` in my `.yarnrc.yml` to disable PnP.

Then I **disable caching of node modules with**:

```bash
heroku config:set NODE_MODULES_CACHE=false --app ga-img-tracker-pr-br-main
```

The caching of node_modules is obviously unnecessary and even problematic
with `yarn` 2, because `yarn` stores all the modules in its `.yarn/cache` dir,
and reconstructs `node_modules` upon the running of `yarn install` from
its own git checked-in cache of modules, **without even accessing the network**.

Next, i disable the production environment variables that heroku sets by default:

```bash
heroku config:unset NPM_CONFIG_PRODUCTION YARN_PRODUCTION --app ga-img-tracker-pr-br-main
```

Apparently by default heroku calls `yarn install --production` but in `yarn` 2 that makes
it fail. Pruning devDependencies after the build is apparently still possible somehow,
but I really don't care about that.

Ok now I'm gonna commit and push to trigger a build and hope it builds!
