process.on('unhandledRejection', err => {
  throw err;
});

const jest = require('jest');
const path = require('path');
const createJestConfig = require('../config/jest/create-jest-config');

process.env.NODE_ENV = 'test';

const argv = process.argv.slice(2);

// add the watch option unless on CI, coverage mode, or watchAll mode
if (
  !process.env.CI &&
  argv.indexOf('--coverage') === -1 &&
  argv.indexOf('--watchAll') === -1 &&
  argv.indexOf('--watch') === -1
) {
  argv.push('--watch');
}

argv.push(
  '--config',
  JSON.stringify(createJestConfig(relativePath => path.resolve(__dirname, '..', relativePath))),
);

jest.run(argv);
