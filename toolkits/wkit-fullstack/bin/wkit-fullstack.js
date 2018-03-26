#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const spawnSync = require('child_process').spawnSync;

const args = process.argv.slice(2);
const commandsDir = path.resolve(__dirname, '../commands');
const possibleCommands = fs.readdirSync(commandsDir).map(file => path.basename(file, '.js'));

if(args.length === 0) {
  console.log('Use one the following commands:');
  console.log();
  console.log(possibleCommands.map(c => '> ' + c).join('\n'));
  process.exit(0);
}

const commandIndex = args.findIndex(arg => possibleCommands.includes(arg));
const command = commandIndex === -1 ? args[0] : args[commandIndex];

if(commandIndex === -1) {
  console.log('Unknown command "' + command + '".');
  process.exit(1);
}

const nodeArgs = commandIndex > 0 ? args.slice(0, commandIndex) : [];
const commandPath = require.resolve(path.join(commandsDir, command));
const scriptArgs = nodeArgs.concat(commandPath).concat(args.slice(commandIndex + 1));

const result = spawnSync('node', scriptArgs ,{ stdio: 'inherit' });

if (result.signal) {
  if (result.signal === 'SIGKILL') {
    console.log(
      'The build failed because the process exited too early. ' +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.'
    );
  } else if (result.signal === 'SIGTERM') {
    console.log(
      'The build failed because the process exited too early. ' +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.'
    );
  }

  process.exit(1);
}

process.exit(result.status);