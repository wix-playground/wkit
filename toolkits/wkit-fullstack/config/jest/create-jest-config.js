const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const paths = require('../paths');

module.exports = resolve => {
  const relativeToRootDir = p => '<rootDir>/' + path.relative(paths.appDir, p);

  const testsSetupFile = fs.existsSync(paths.testsSetup)
    ? relativeToRootDir('src/test-setup.js')
    : undefined;

  const config = {
    collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
    setupFiles: [resolve('config/polyfills.js')],
    setupTestFrameworkScriptFile: testsSetupFile,
    testMatch: ['**/__tests__/**/*.{js,jsx,mjs}', '**/?(*.)(spec|test).{js,jsx,mjs}'],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(js|jsx|mjs)$': resolve('config/jest/babel-transform.js'),
      '^.+\\.css$': resolve('config/jest/css-transform.js'),
      '^(?!.*\\.(js|jsx|mjs|css|json|graphql)$)': resolve('config/jest/file-transform.js'),
    },
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
      '^.+\\.module\\.css$',
    ],
    moduleNameMapper: {
      '^.+\\.module\\.css$': 'identity-obj-proxy',
    },
    moduleFileExtensions: ['web.js', 'mjs', 'js', 'json', 'web.jsx', 'jsx', 'node'],
  };

  const overrides = Object.assign({}, require(paths.appPackageJson).jest);
  const supportedKeys = [
    'collectCoverageFrom',
    'coverageReporters',
    'coverageThreshold',
    'resetMocks',
    'resetModules',
    'snapshotSerializers',
    'watchPathIgnorePatterns',
  ];

  if (overrides) {
    supportedKeys.forEach(key => {
      if (overrides.hasOwnProperty(key)) {
        config[key] = overrides[key];
        delete overrides[key];
      }
    });

    const unsupportedKeys = Object.keys(overrides);

    if (unsupportedKeys.length) {
      const isOverridingSetupFile = unsupportedKeys.indexOf('setupTestFrameworkScriptFile') > -1;

      if (isOverridingSetupFile) {
        console.error(
          chalk.red(
            'We detected ' +
              chalk.bold('setupTestFrameworkScriptFile') +
              ' in your package.json.\n\n' +
              'Remove it from Jest configuration, and put the initialization code in ' +
              chalk.bold('src/test-setup.js') +
              '.\nThis file will be loaded automatically.\n',
          ),
        );
      } else {
        console.error(
          chalk.red(
            '\nOut of the box, There is only support for overriding ' +
              'these Jest options:\n\n' +
              supportedKeys.map(key => chalk.bold('  \u2022 ' + key)).join('\n') +
              '.\n\n' +
              'These options in your package.json Jest configuration ' +
              'are not currently supported:\n\n' +
              unsupportedKeys.map(key => chalk.bold('  \u2022 ' + key)).join('\n'),
          ),
        );
      }

      process.exit(1);
    }
  }

  return config;
};
