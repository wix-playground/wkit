const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  // Let's use create-react-app's preset untill we'll create our own
  presets: [require.resolve('babel-preset-react-app')],
  babelrc: false,
});
