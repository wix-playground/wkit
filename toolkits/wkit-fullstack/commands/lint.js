process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs');
const path = require('path');
const { CLIEngine } = require('eslint');

const fix = true;

const eslintrcPath = path.relative(process.cwd(), '.eslintrc');
const eslintrcExists = fs.existsSync(eslintrcPath);

const configFile = eslintrcExists ? eslintrcPath : require.resolve('eslint-config-fullstack');

const cli = new CLIEngine({ configFile, fix });

const report = cli.executeOnFiles(['**/*.{js,jsx}']);

if (fix) {
  CLIEngine.outputFixes(report);
}

const errors = CLIEngine.getErrorResults(report.results);

if (errors.length > 0) {
  const formatter = cli.getFormatter();

  console.log(formatter(report.results));

  process.exit(1);
}

process.exit(0);
