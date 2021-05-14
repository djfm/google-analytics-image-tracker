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

const unknownMeasurementId = 'unknownMeasurementId';

const getId = (req: Request): string => req.ip ?? req.socket.remoteAddress;

// TODO envoyer une requête PURGE (curl -X PURGE url) pour vider le cache Camo de GitHub

app.use((req, res, next) => {
  const measurementId = req.query.measurementId ?? unknownMeasurementId;
  const ip = getId(req);

  const sha = crypto.createHash('sha1');
  sha.update(`${measurementId}-${ip}`);

  const ETag = sha.digest('hex');

  // eslint-disable-next-line no-console
  console.log(
    `#### Request ${req.method}`,
    `from ${ip}`,
    `to ${req.url}\n`,
    req.query, '\n',
    req.headers, '\n',
    { measurementId },
  );

  if (req.method === 'GET') {
    res.set({
      'Cache-Control': 'no-cache, must-revalidate, proxy-revalidate',
      'Access-Control-Max-Age': '1',
      'Content-Type': 'image/png',
      ETag,
    });
    res.sendFile(path.join(publicPath, 'badge.png'));
  } else {
    next();
  }
});

// the process.env.PORT will be set by heroku
const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
