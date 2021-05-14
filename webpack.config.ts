import path from 'path';

// eslint-disable-next-line import/no-extraneous-dependencies
import nodeExternals from 'webpack-node-externals';

export default {
  mode: process.env.NODE_ENV ?? 'production',
  entry: './src/server/index.ts',
  target: 'node',
  // this tells webpack not to bundle external modules
  externals: [nodeExternals()],
  // and this tells webpack to include node builtins like `path` or `fs`
  externalsPresets: {
    node: true,
  },
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
