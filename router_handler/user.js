const check = require('./check')
const db = require('../db')
const selSql = `select * from orderfood_users where account=?`
const setSql = 'insert into orderfood_users set ?'
const msg = require('../handler/msg')
//token加密包
const jwt = require('jsonwebtoken')
const config = require('./config')

// 注册
exports.regUser = (req, res) => {
  let { account, password, shopname } = req.body
  if (account === undefined || password === undefined) {
    return msg(res, '参数填写错误.', 400)
  }
  check.account(res, account)
  check.password(res, password)
  // 开始检查数据库有没有存在号码
  db.query(selSql, account, (err, results) => {
    if (err) {
      return msg(res, err.message, 500)
    } else if (results.length > 0) {
      // 手机号码存在
      return msg(res, '号码已存在，请前往登录.', 400)
    }
    // 手机号码不存在开始注册
    let uid = new Date().getTime(),
      struid = JSON.stringify(uid),
      OBJ = {
        account,
        password,
        shopname,
        uid: struid
      }
    setUser(res, OBJ)
    return
  })
}

// 注册
function setUser(res, obj) {
  db.query(setSql, obj, function (err, results) {
    // 执行 SQL 语句失败
    if (err) throw msg(res, err.message, 500)
    // SQL 语句执行成功，但影响行数不为 1
    if (results.affectedRows !== 1) {
      return msg(res, '注册用户失败，请稍后再试！', 400)
    }
    // 注册成功
    msg(res, '注册成功,请返回登录.', 200)
  })
}

// 登录
exports.login = (req, res) => {
  console.log(req)
  let { account, password } = req.body
  if (account === undefined || password === undefined) {
    return msg(res, '参数填写错误.', 400)
  }
  // 开始检查数据库有没有存在号码
  db.query(selSql, account, (err, results) => {
    // console.log(results)
    if (err) {
      return msg(res, err.message, 500)
    } else if (results.length === 0) {
      // 手机号码未存在
      return msg(res, '用户不存在,请注册再登录。', 400)
    }
    if (password != results[0].password) {
      return msg(res, '密码错误', 400)
    }

    // 生成token字符串
    const tokenStr = jwt.sign({ account, password }, config.jwtSecretKey, { expiresIn: '10h' })
    msg(res, '登录成功', 200, { token: 'Bearer ' + tokenStr })
    // // return msg(res, '号码已存在，请前往登录.', 400)
    return
  })
}
