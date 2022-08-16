
// 1. 导入express函数对象
const express = require('express')
// 2. 创建路由对象(和server对象功能一样)
const router = express.Router()
// 3. index.js里注册和登录接口以及dbFn方法"剪切"
const dbFn = require('../config/mysql')
 // 获取教师信息
router.get('/teacherInfo', (req, res) => {
    //拿到前端传过来的数据
    console.log(req.query); // {user: 名字, pass: 密码} - 前端写的data里user和pass
    let start = (req.query.currentPage -1)*req.query.pageSize
    console.log(start);

    let sqlStr = `SELECT * FROM teachers LIMIT ${start},${req.query.pageSize};SELECT COUNT(*) as 'total' FROM students;`
      // 3. 执行SQL语句
      dbFn(sqlStr, function(result){
          console.log(result);
          res.send({
            msg:'教师信息获取成功',
            data:result[0],
            total:result[1]
          })
      })
})
// 搜索教师
router.post('/searchTerInfo', (req, res) => {
  console.log(req.body)
  let sqlSearch;
    if(req.body.tno){
      sqlSearch = `SELECT * FROM teachers where tno ='${req.body.tno}'`
      // 3. 执行SQL语句
      dbFn(sqlSearch, function(result){
          console.log(result);
          res.send({
            msg:'教师信息获取成功',
            data:result
          })
      })
    }else if(req.body.tno&&req.body.tname){
      sqlSearch = `SELECT * FROM teachers where tno =${req.body.tno} AND tname = ${req.body.tname}`
      // 3. 执行SQL语句
      dbFn(sqlSearch, function(result){
          console.log(result);
          res.send({
            msg:'教师信息获取成功',
            data:result
          })
      })
    }else if(req.body.tno&&req.body.tname&&req.body.tdept){
      sqlSearch = `SELECT * FROM teachers where tno =${req.body.tno} AND tname = ${req.body.tname} And tdept = ${req.body.tdept}`
      // 3. 执行SQL语句
      dbFn(sqlSearch, function(result){
          console.log(result);
          res.send({
            msg:'教师信息获取成功',
            data:result
          })
      })
    }else{
      sqlSearch = 'SELECT * FROM `teachers`'
      // 3. 执行SQL语句
      dbFn(sqlSearch, function(result){
          console.log(result);
          res.send({
            msg:'教师信息获取成功',
            data:result
          })
      })
    }

})
// 修改教师信息editTerInfo
router.put('/editTerInfo', (req, res) => {
  //拿到前端传过来的数据
  console.log(req.body); 
  let sqlStr = `UPDATE teachers SET tname='${req.body.tname}',tgender='${req.body.tgender}',tdept = '${req.body.tdept}',title = '${req.body.title}',tech = '${req.body.tech}' WHERE tno='${req.body.tno}'`
    // 3. 执行SQL语句
    dbFn(sqlStr, function(result){
        console.log(result);
        res.send({
          msg:'教师信息修改成功',
          data:result,
          code:200
          
        })
    })
})
// 删除教师信息delTerInfo
router.delete('/delTerInfo',(req,res)=>{
  console.log(req.body);
  let obj = req.body
  let sql = `DELETE from teachers WHERE tno='${obj.tno}'`
  // 执行sql语句
  dbFn(sql, function(result){
    console.log(result)
    res.send({
      msg:'教师删除成功',
      code:200
      // noticeData:result,
      // total:result[1]
    })
  })
})

// 4. 导出router路由对象
// 引入后端项目主入口是index.js
module.exports = router