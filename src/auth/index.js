// jwt 不关系服务状态，服务关了之后，仍然可获得登录信息，是通过token保存的
// 生成token： 三部分 令牌头.载体信息.前两者的签名
// 如何做到放篡改，令牌头.载体信息（这两部分是通过base64编码的） 及 签名不一致
const jsonwebtoke = require('jsonwebtoken');
const jwtAuth = require('koa-jwt'); // 验证token

const secret = '111111'; // 秘钥
const user = {
  username: 'san.zhang'
}
// sgin 签名
const token = jsonwebtoke.sign({
  data: user,
  exp: Math.floor(Date.now() / 1000) + (60 * 60)
}, secret);

// jwtAuth 验证

