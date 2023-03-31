// function errMsg(res, msg = 'Error', status = 400) {
//   res.send(status, msg)
// }

function msg(res, msg = 'success', status = 200, data = null, extra = null) {
  // res.sendStatus(status)
  res.send({
    status,
    msg,
    data,
    extra
  })
}

module.exports = msg
