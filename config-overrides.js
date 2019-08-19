const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addLessLoader
} = require('customize-cra');
const path = require('path');

const addTarget = (config) => {
  config.target = 'electron-renderer';
  return config;
}

module.exports = override(
  addTarget,
  addWebpackAlias({
    // eslint-disable-next-line no-useless-computed-key
    ["@"]: path.resolve(__dirname, "."),
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    localIdentName: "[local]--[hash:base64:5]" // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
  })
);