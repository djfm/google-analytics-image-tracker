import path from 'path';
import express from 'express';

const app = express()

app.use(express.static(
  path.resolve(
    __dirname,
    '..',
    '..',
    'public',
  ),
));

// the process.env.PORT will be set by heroku
const port = process.env.PORT ?? 3000;

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
