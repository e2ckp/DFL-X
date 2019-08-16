const {
  override,
  fixBabelImports,
  addWebpackAlias
} = require('customize-cra');
const path = require('path');

const addTarget=(config)=>{
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
);