const path = require('path');
const fs = require('fs');

const appDir = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDir, relativePath);

module.exports = {
  testsSetup: resolveApp('src/test-setup.js'),
  appSrc: resolveApp('src'),
  appPackageJson: resolveApp('package.json'),
  appDir,
};