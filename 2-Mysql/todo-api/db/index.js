// 封装数据库的操作
// 1. 导入mysql包
const mysql = require('mysql')

// 导入配置文件
const { mysql: MySQLCon } = require('../config/config.default.js')
// 2. 创建数据库连接
const con = mysql.createConnection({
  host: MySQLCon.host,
  port: MySQLCon.port,
  user: MySQLCon.user,
  password: MySQLCon.password,
  database: MySQLCon.database,
  // dateStrings: true,
  timezone: 'SYSTEM',
})
// 3. 连接数据库
con.connect()

// 4. 编写操作
/**
 * 获取所有数据
 * @param {string} sql : 执行的sql语句
 * @return {promise}
 */
function getAll(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, data) => {
      if (err) reject(err)

      resolve(data)
    })
  })
}

/**
 * 获取所有数据
 * @param {string} sql : 执行的sql语句
 * @return {promise}
 */
function getOne(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, data) => {
      if (err) reject(err)

      // data是一个数组
      // if (data.length != 0) {
      //   // 查询到了数据
      //   resolve(data[0])
      // } else {
      //   resolve(null)
      // }
      data.length != 0 ? resolve(data[0]) : resolve(null)
    })
  })
}

/**
 * 执行sql语句
 * @param {string} sql : 执行的sql语句
 * @return {promise}
 */
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, data) => {
      if (err) reject(err)

      resolve(data)
    })
  })
}

// 暴露3个方法
module.exports = {
  getAll,
  getOne,
  exec,
}
