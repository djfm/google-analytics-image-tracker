import { sep, join, dirname } from 'path';

// cannot use require.main.filename because webpack
// does something strange, so I'm using this which
// does the same thing
import mainFilename from 'require-main-filename';

// the absolute path to the file that
// was passed to node
const entryDir = dirname(mainFilename());

const rootPathComponents = entryDir.split(sep);
// under Linux, rootPathComponents starts with an empty
// string because absolute paths start with sep
if (rootPathComponents[0] === '') {
  rootPathComponents[0] = sep;
}

// the following constant could be either "build"
// or "server", depending on whether we're running the
// original source code with ts-node (then "server"),
// or if we're running the webpack-generated bundle,
// which resides in a directory named "build"
const entryBasename = rootPathComponents.pop();

if (entryBasename === 'server') {
  // if we are running from "src/server/index.ts",
  // since we already popped "server",
  // we just need to pop one more element to get
  // to the root of the project
  rootPathComponents.pop();
}

export default join(...rootPathComponents);
