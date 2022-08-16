// 1. 导入express函数对象
const express = require('express')
// 2. 创建路由对象(和server对象功能一样)
const router = express.Router()
// 3. index.js里注册和登录接口以及dbFn方法"剪切"
const dbFn = require('../config/mysql')
// 发布论坛
router.post('/putForum', (req, res) => {
    // 1. 拿到前端传过来的数据
    console.log(req.body); 
    // 2. 查询
    let sqlStr = `INSERT INTO forum(aut_name,content) VALUES('${req.body.aut_name}','${req.body.content}')`
    // let result;
    // 3. 执行SQL语句
    dbFn(sqlStr, function(result){
        console.log(result);
        // result  = result
        res.send({
          msg:'论坛发布成功',
          code:200,
          data:result,
        })
    })
    
})
// 获取我的论坛getMyForum
router.post('/getMyForum', (req, res) => {
  // 1. 拿到前端传过来的数据
  console.log(req.body); 
  // 2. 查询
  let sqlStr = `SELECT * from forum WHERE aut_name = '${req.body.aut_name}'`
  // let result;
  // 3. 执行SQL语句
  dbFn(sqlStr, function(result){
      console.log(result);
      // result  = result
      res.send({
        msg:'我的论坛获取成功',
        code:200,
        myforum:result,
      })
  })
  
})
// 获取论坛getAllForum
router.get('/getAllForum', (req, res) => {
  // 1. 拿到前端传过来的数据
  console.log(req.body); 
  // 2. 查询
  let sqlStr = `SELECT * from forum`
  // let result;
  // 3. 执行SQL语句
  dbFn(sqlStr, function(result){
      console.log(result);
      // result  = result
      res.send({
        msg:'论坛获取成功',
        code:200,
        forum:result,
      })
  })
  
})
// 4. 导出router路由对象
// 引入后端项目主入口是index.js
module.exports = router