const msg = require('../handler/msg')

exports.account = (res, mb) => {
  let phone = /^1[3456789]\d{9}$/
  if (!phone.test(mb)) {
    throw msg(res, '手机号码格式错误。', 400)
  }
}

exports.password = (res, pwd) => {
  let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
  if (!reg.test(pwd)) {
    throw msg(res, '密码必须是6-20位数字字母组合。', 400)
  }
}
