// 1. 导入express函数对象
const express = require('express')
// 2. 创建路由对象(和server对象功能一样)
const router = express.Router()
// 3. index.js里注册和登录接口以及dbFn方法"剪切"
const dbFn = require('../config/mysql')
// 获取学生姓名/getSname
router.post('/getSname', (req, res) => {
  // 1. 拿到前端传过来的数据
  console.log(req.body); 
  const sno = req.body.sno
  let sqlSname = `SELECT sname from students WHERE sno='${sno}';`
 
  dbFn(sqlSname, function(result){
    console.log(result);
    // result  = result
    res.send({
      msg:'学生姓名获取成功',
      code:200,
      sname:result[0].sname
    })
})
})
// 提交评分
router.post('/putScore', (req, res) => {
  // 1. 拿到前端传过来的数据
  console.log(req.body); 
  const dataObj = req.body
    let sqlStr = `INSERT INTO score(sno,sname,intermajor,internreport,internshow,totalScore) VALUES('${dataObj.sno}','${dataObj.sname}',${dataObj.intermajor},${dataObj.internreport},${dataObj.internshow},${dataObj.totalScore});`
    // let result;
    // 3. 执行SQL语句
    dbFn(sqlStr, function(result){
        console.log(result);
        // result  = result
        res.send({
          msg:'成绩添加成功',
          code:200,
          list:result
        })
    })

  
})
// 获取成绩单
router.post('/getScore', (req, res) => {
  // 1. 拿到前端传过来的数据
  console.log(req.body); 
  // const dataObj = req.body
  let sqlStr = `SELECT * FROM score;`
  // let result;
  // 3. 执行SQL语句
  dbFn(sqlStr, function(result){
      console.log(result);
      // result  = result
      res.send({
        msg:'成绩成功',
        code:200,
        list:result
      })
  })
  
})

module.exports = router