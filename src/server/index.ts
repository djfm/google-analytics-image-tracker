import path from 'path';
import express from 'express';

import rootPath from '../../rootPath';

// TODO for production, find a good node reloader
// that restarts the app in case it crashes

const app = express();

const publicPath = path.join(
  rootPath,
  'public',
);

app.use(express.static(publicPath));

// the process.env.PORT will be set by heroku
const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
