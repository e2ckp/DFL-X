//定义根目录，静态文件目录，配置文件目录
const isDev = require('electron-is-dev');
//根目录
export const _rootPath = isDev ? './' : './resources/app.asar.unpacked/';
//静态文件目录
export const _static = `${_rootPath}static`;
//配置文件目录
export const _config = `${_rootPath}config`;