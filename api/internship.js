const express = require('express')

const router = express.Router()

const dbFn = require('../config/mysql')
// 添加实习信息
router.post('/addInterMsg',(req,res)=>{
  console.log(req.body);
  const obj  = req.body
  let sql = `INSERT INTO interninfo VALUES('${obj.sno}','${obj.enterprise}','${obj.address}','${obj.nature}','${obj.startTime}','${obj.endTime}','${obj.position}')`
  // let sql = 'SELECT * FROM user'+'LIMIT'+start+','+req.body.pageSize
  // // 执行sql语句
  dbFn(sql, function(result){
    console.log(result)
    res.send({
      msg:'实习信息添加取成功',
      infoData:result
    })
  })
})

module.exports = router