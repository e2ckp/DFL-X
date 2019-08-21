const fse = require('fs-extra');
import { decrypt, encryption } from '../EnAndCryption';

export const saveFile = (test: string, path: string) => {
  //确保文件存在
  fse.ensureFileSync(path);
}