const express = require('express')

const router = express.Router()

const dbFn = require('../config/mysql')

// 获取公告getNotice
router.get('/getNotice',(req,res)=>{
  console.log(req.query);
  let sql = `SELECT * FROM notice `
  // // 执行sql语句
  dbFn(sql, function(result){
    console.log(result)
    res.send({
      msg:'公告获取成功',
      noticeData:result,
      // total:result[1]
    })
  })
})
// 新增公告addNoticeListAPI
router.post('/addNotice',(req,res)=>{
  console.log(req.body);
  let obj = req.body
  let sql = `INSERT INTO notice(date,name,title,content) VALUES('${obj.date}','${obj.name}','${obj.title}','${obj.content}')`
  // 执行sql语句
  dbFn(sql, function(result){
    console.log(result)
    res.send({
      msg:'公告添加成功',
      code:200
      // noticeData:result,
      // total:result[1]
    })
  })
})
// 删除公告
router.post('/confirmNotice',(req,res)=>{
  console.log(req.body);
  let obj = req.body
  // update zhouji SET weeknum = '${req.body.weeknum}' WHERE sno='${req.body.sno}'`
  let sql = `update notice SET status = 'true'  WHERE nid='${obj.nid}'`
  // 执行sql语句
  dbFn(sql, function(result){
    console.log(result)
    res.send({
      msg:'公告确认成功',
      code:200
      // noticeData:result,
      // total:result[1]
    })
  })
})
// 确认公告
router.delete('/delNotice',(req,res)=>{
  console.log(req.body);
  let obj = req.body
  let sql = `DELETE from notice WHERE date='${obj.date}' AND name='${obj.name}' AND title='${obj.title}' AND content = '${obj.content}'`
  // 执行sql语句
  dbFn(sql, function(result){
    console.log(result)
    res.send({
      msg:'公告删除成功',
      code:200
      // noticeData:result,
      // total:result[1]
    })
  })
})

// 4. 导出router路由对象
// 引入后端项目主入口是index.js
module.exports = router