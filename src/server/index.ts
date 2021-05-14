import path from 'path';
import express, { Request } from 'express';
import crypto from 'crypto';

import rootPath from '../../rootPath';

// TODO for production, find a good node reloader
// that restarts the app in case it crashes

const app = express();

const publicPath = path.join(
  rootPath,
  'public',
);

app.use(express.static(publicPath));

/*
accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*\/*; q = 0.8'
'x-forwarded-for': '10.56.111.59',
'cache-control': 'max-age=259200',
via: 'HTTP/1.1 github-camo (07ab9467), 1.1 network-proxy-180b0e5.ash1-iad.github.net (squid/3.5.23)'
*/

const unknownMeasurementId = 'unknownMeasurementId';

const getId = (req: Request): string => {
  if (req.hostname) {
    return req.hostname;
  }

  return req.ip;
};

app.get('*', (req, res) => {
  // TODO envoyer une requête PURGE (curl -X PURGE url) pour vider le cache Camo de GitHub

  const measurementId = req.query.measurementId ?? unknownMeasurementId;

  const sha = crypto.createHash('sha1');
  sha.update(`${measurementId}-${getId(req)}`);

  const ETag = sha.digest('hex');

  // eslint-disable-next-line no-console
  console.log('#### Request', req.url, '\n', req.query, '\n', req.headers, '\n', { measurementId });
  res.set({
    'Cache-Control': 'no-cache',
    'Access-Control-Max-Age': '1',
    'Content-Type': 'image/png',
    ETag,
  });
  res.sendFile(path.join(publicPath, 'badge.png'));
});

// the process.env.PORT will be set by heroku
const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
