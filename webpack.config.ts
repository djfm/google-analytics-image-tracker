import path from 'path';

export default {
  mode: process.env.NODE_ENV ?? 'production',
  entry: './src/server/index.ts',
  target: 'node',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\?ts$/,
        loader: 'ts-loader',
      },
    ],
  },
};
