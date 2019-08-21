const crypto = require('crypto');
//随机key值
const key = 'nihLS6ng<J-id@\n}eTKY,p63`c-6a{r';
// 加密
export const encryption = (text: string) => {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}
// 解密
export const decrypt = (text: string) => {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
}