
// 1. 导入express函数对象
const express = require('express')
// 2. 创建路由对象(和server对象功能一样)
const router = express.Router()
// 3. index.js里注册和登录接口以及dbFn方法"剪切"
const dbFn = require('../config/mysql')

router.get('/studentInfo', (req, res) => {
    // 1. 拿到前端传过来的数据
    console.log(req.query); // {user: 名字, pass: 密码} - 前端写的data里user和pass
    let start = (req.query.currentPage -1)*req.query.pageSize
    console.log(start)
    // 2. 查询
    let sqlStr = `SELECT * FROM students INNER JOIN teachers on students.stutor=teachers.tno LIMIT ${start},${req.query.pageSize};SELECT COUNT(*) as 'total' FROM students;`
    // let result;
    // 3. 执行SQL语句
    dbFn(sqlStr, function(result){
        console.log(result);
        // result  = result
        res.send({
          msg:'信息获取成功',
          list:result[0],
          total:result[1]
        })
    })
})
// 搜索学生
router.post('/searchStuInfo', (req, res) => {
  console.log(req.body)
  let sqlSearch;
  if(req.body.sno&&req.body.sname&&req.body.sdept&&req.body.stutor){
    sqlSearch = `SELECT * FROM students where sno =${req.body.sno} AND sname = ${req.body.sname} And sdept = ${req.body.sdept} AND stutor = ${req.body.stutor}`
    // 3. 执行SQL语句
    dbFn(sqlSearch, function(result){
        console.log(result);
        res.send({
          msg:'学生信息获取成功',
          data:result
        })
    })
  }else if(req.body.sno&&req.body.sname&&req.body.sdept){
    sqlSearch = `SELECT * FROM students where sno =${req.body.sno} AND sname = ${req.body.sname} And sdept = ${req.body.sdept}`
    // 3. 执行SQL语句
    dbFn(sqlSearch, function(result){
        console.log(result);
        res.send({
          msg:'教师信息获取成功',
          data:result
        })
    })
  }else if(req.body.sno&&req.body.sname){
      sqlSearch = `SELECT * FROM students where sno =${req.body.sno} AND sname = ${req.body.sname}`
      // 3. 执行SQL语句
      dbFn(sqlSearch, function(result){
        // console.log(err)
          console.log(result);
          res.send({
            msg:'学生信息获取成功',
            data:result
          })
      })
    }else if(req.body.sno){
      sqlSearch = `SELECT * FROM students where sno ='${req.body.sno}'`
      // 3. 执行SQL语句
      dbFn(sqlSearch, function(result){
          console.log(result);
          res.send({
            msg:'学生信息获取成功',
            data:result
          })
      })
    }else{
      sqlSearch = 'SELECT * FROM `students`'
      // 3. 执行SQL语句
      dbFn(sqlSearch, function(result){
          console.log(result);
          res.send({
            msg:'学生信息获取成功',
            data:result
          })
      })
    }

})
// 编辑学生信息
router.put('/editStuInfo',(req,res)=>{
  //拿到前端传过来的数据
  console.log(req.body); 
  let sqlStr = `UPDATE students SET sname='${req.body.sname}',sex='${req.body.sex}',sdept = '${req.body.sdept}',sclass = '${req.body.sclass}',smajor = '${req.body.smajor}',stutor = '${req.body.stutor}',sphone = '${req.body.sphone}' WHERE sno='${req.body.sno}'`
    // 3. 执行SQL语句
    dbFn(sqlStr, function(result){
        console.log(result);
        res.send({
          msg:'学生信息修改成功',
          data:result,
          code:200
          
        })
    })
})
// 删除学生信息
router.delete('/delStuInfo',(req,res)=>{
  //拿到前端传过来的数据
  console.log(req.body); 
  let sqlStr = `DELETE from students WHERE sno='${req.body.sno}'`
    // 3. 执行SQL语句
    dbFn(sqlStr, function(result){
        console.log(result);
        res.send({
          msg:'学生信息删除成功',
          data:result,
          code:200
          
        })
    })
})


// 获取周记列表
router.post('/reportList', (req, res) => {
  // 1. 拿到前端传过来的数据
  console.log(req.body); // {user: 名字, pass: 密码} - 前端写的data里user和pass
  if(!req.body.weeknum){
    // 2. 查询
  let sqlStr = `SELECT * from zhouji WHERE sno=${req.body.sno}`
  // let result;
  // 3. 执行SQL语句
  dbFn(sqlStr, function(result){
      console.log(result);
      // result  = result
      res.send({
        msg:'周记列表获取成功',
        list:result
      })
  })
  }else{
    // 2. 查询
  let sqlStr = `SELECT * from zhouji WHERE sno=${req.body.sno} And weeknum=${req.body.weeknum}`
  // let result;
  // 3. 执行SQL语句
  dbFn(sqlStr, function(result){
      console.log(result);
      // result  = result
      res.send({
        msg:'周记详情获取成功',
        list:result
      })
  })
  }
  
})
// 修改周记
router.post('/editReport', (req, res) => {
  // 1. 拿到前端传过来的数据
  console.log(req.body); // {user: 名字, pass: 密码} - 前端写的data里user和pass
    // 2. 查询
  let sqlStr = `update zhouji SET weeknum = '${req.body.weeknum}',starttime = '${req.body.starttime}',endtime = '${req.body.endtime}',project = '${req.body.project}',record = '${req.body.record}',experience = '${req.body.experience}',difficulty = '${req.body.difficulty}' WHERE sno='${req.body.sno}' AND weeknum = '${req.body.weeknum}'`
  // let result;
  // 3. 执行SQL语句
  dbFn(sqlStr, function(result){
      console.log(result);
      // result  = result
      res.send({
        msg:'周记编辑成功',
        list:result,
        code:200
      })
  })
  
})
// 添加周记
router.post('/addReport', (req, res) => {
  // 1. 拿到前端传过来的数据
  console.log(req.body); // {user: 名字, pass: 密码} - 前端写的data里user和pass
    // 2. 查询
  let sqlStr = `INSERT INTO zhouji(sno,weeknum,starttime,endtime,project,record,experience,difficulty) VALUES('${req.body.sno}','${req.body.weeknum}','${req.body.starttime}','${req.body.endtime}','${req.body.project}','${req.body.record}','${req.body.experience}','${req.body.difficulty}');`
  // let result;
  // 3. 执行SQL语句
  dbFn(sqlStr, function(result){
      console.log(result);
      // result  = result
      res.send({
        msg:'周记添加成功',
        list:result,
        code:200
      })
  })
  
})
// 4. 导出router路由对象
// 引入后端项目主入口是index.js
module.exports = router