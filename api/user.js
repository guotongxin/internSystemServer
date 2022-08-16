const express = require('express')

const router = express.Router()

const dbFn = require('../config/mysql')
// 注册接口
// const { md5 } = require('utility')
let uname;
let userInfo;

// 登录接口
const jwt = require('jsonwebtoken')
router.post('/login', (req, res) => {
    console.log(req.body);
    // console.log(`${md5(req.body.password)}`)
    // 业务: 把前端传递过来用户名和密码(加密)去数据库查询
    let sql = `SELECT * FROM user WHERE username='${req.body.username}' AND password='${req.body.password}';SELECT * FROM user WHERE username='${req.body.username}';`
    // 执行sql语句
    dbFn(sql, function(result){
        console.log(result);
        // 根据查询结果
        if (result[0].length === 0) {
            // 没查到
            // res 响应对象
            res.send({
                msg: '账号/密码错误',
                code: 10004 // 方便前端判断-可选
            })
        } else {
            // 查到
            res.send({
                msg: '登录成功了',
                code: 10000, // 方便前端判断-可选(随便写)
                userInfo:result[1],
                token: 'Bearer ' + jwt.sign({id: result[0].id, name: result[0].username }, 'gtx', {expiresIn: '2h'}) // 'Bearer ' 
                // 前端收到这个token之后, 后端以后要验证token的模块包叫express-jwt包, 要求token字符串前面要加一个Bearer空格
            })
            console.log('gtx')
            console.log('gtx',result)
            uname = result[0].username;
            userInfo = result[0]
            console.log(uname)
        }
    })
})
// 获取用户信息
router.get('/userInfo',(req,res)=>{
  console.log(req.query);
  // 
  let start = (req.query.currentPage -1)*req.query.pageSize
  // console.log(start)
  
  let sql = `SELECT * FROM user LIMIT ${start},${req.query.pageSize};SELECT COUNT(*) as 'total' FROM user;`
  // let sql = 'SELECT * FROM user'+'LIMIT'+start+','+req.body.pageSize
  // // 执行sql语句
  dbFn(sql, function(result){
    console.log(result)
    res.send({
      msg:'用户信息获取成功',
      infoData:result[0],
      total:result[1]
    })
  })
})
// 新增用户
router.post('/addUser',(req,res)=>{
  console.log(req.body);
  const obj = req.body
  // 新增到用户表
  let addUserSql = `INSERT INTO user(username,password,role) VALUES('${obj.username}','${obj.password}','${obj.role}')`
  // 执行sql语句
  dbFn(addUserSql, function(result){
    console.log(result)
    res.send({
      msg:'用户添加成功',
      code:200
    })

  })
  // 角色是教师添加到教师表
  if(obj.role =='teacher'){
    let sqlTea = `INSERT INTO teachers(tno,tname,role) VALUES('${obj.username}','${obj.username}','${obj.role}')`
    dbFn(sqlTea, function(result){
      res.send({
        msg:'新增成功'
      })
    })

  }
  // 学生加到学生表
  // `insert into user set username='${req.body.user}',password='${md5(req.body.pass)}'`
  if(obj.role=='student'){
    let sqlStu = `INSERT INTO students(sno,sname,role) VALUES('${obj.username}','${obj.username}','${obj.role}')`
    dbFn(sqlStu, function(result){
      res.send({
        msg:'新增成功'
      })
    })
  }
})

// // 获取登录用户信息
router.post('/loginInfo',(req,res)=>{
  console.log(uname);
  let sql = ` select * from user WHERE username='${uname}' `
  // 执行sql语句
  dbFn(sql, function(result){
    console.log(result)
    res.send({
      msg:'获取登录用户信息成功',
      info:result,
      userInfo:userInfo,
      code:200
      // noticeData:result,
      // total:result[1]
    })
  })
})

// 4. 导出router路由对象
// 引入后端项目主入口是index.js
module.exports = router
