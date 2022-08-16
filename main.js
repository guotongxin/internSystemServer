const express = require('express')
const server = express()

const cors = require('cors')
server.use(cors()) // 开启cors-支持任何人来跨域访问我

// 注册接口
// 提取前端传递过来的"请求体"里的参数名和值, 形成一个对象挂载到req.body里
// 把前端传过来的查询字符串key=value&key=value转成对象形式
// express.urlencoded内部就封装了querystring模块
server.use(express.urlencoded({ extended: true }))
// 前端如果传递的是json字符串, 它会给你转成对象形式
server.use(express.json())
// 内置的方法内部, 都会有next(), 才能让下一个中间件函数继续执行
// 上面这2个中间件, req.body赋值
// 注意: req对象, 也会被内置传给下一个中间件(无需next()里显示写出)
// 所有的中间件, req对象都是同一个共享的

// 把token值, 解密转成数据对象
// express-jwt (解密token的) -> 数据对象
// jsonwebtoken (加密token的) -> 数据对象->token字符串
const expressJwt = require('express-jwt')
server.use(
    expressJwt({
        secret: 'gtx', // 必须和创建token的秘钥是同一个
        algorithms: ['HS256'] // 必须写-加密算法也是解密用算法
    }).unless({ // 某些接口地址无需解密认证token
        path: ['/api/login', '/api/register']
    })
)
// 如果expressJwt内部解密过程报错了, 发现token过期/被篡改了, 内部就会执行next('错误对象')
// express-jwt把正确的token值解密 -> 挂载到req.user属性上


// 验证请求过来的数据是否符合格式
// server.use((req, res, next) => {
//     // 只验证注册的接口
//     // console.log(req.body); // {user: '用户名', pass: '密码'}
//     // let {user: user, pass: pass} = req.body // 左边key对应, value位置就是let定义的变量名
//     let { user, pass } = req.body;
//     // console.log(user, pass);
//     // 验证用户名
//     if (/^[a-zA-Z][0-9a-zA-Z_]{1,9}$/.test(user) === false) {
//         next('用户名只能包含数组字母下划线，长度2~10位，字母开头'); // 直接进入到最后的错误处理中间件函数中
//     } else if (/^\S{6,12}$/.test(pass) === false) {
//         next('密码6~12位且不能出现空格'); // 直接进入到最后的错误处理中间件函数中
//     } else { // 放行, 执行下一个use()中间件->业务逻辑api啦
//         next();
//     }
// })



// 获取教师相关接口
const userTeacherRouter = require('./api/teacher')
server.use('/api', userTeacherRouter)
//  获取学生相关接
const userStudentRouter = require('./api/student')
server.use('/api', userStudentRouter)
// 获取用户
const usertRouter = require('./api/user')
server.use('/api', usertRouter)
// 公告相关
const noticeRouter = require('./api/notice')
server.use('/api', noticeRouter)
// 实习信息
const internRouter = require('./api/internship')
server.use('/api', internRouter)
// 周报信息
const reportRouter = require('./api/report')
server.use('/api', reportRouter)
// 成绩
const scoreRouter = require('./api/score')
server.use('/api/sco', scoreRouter)
// 论坛
const forumRouter = require('./api/forum')
server.use('/api/for', forumRouter)


// (只需要在最后一个中间件, 写4个参数的)
// 兜底判断错误
server.use((err, req, res, next) => {
  console.log('err',err)
  console.log('req',req)
  console.log('res',res)
    // 如果前面任意一个中间件, next(错误信息)-> 直接进入最后这个4个参数的中间件中
    if (err.name === 'UnauthorizedError') { // express-jwt内部报错传递下来的错误对象里名字(固定)
        res.status(401).send({
            code: 10004,
            msg: '你的token已经过期了'
        })
    } else {
        // 本次响应的状态码不是200了, 而是403
        res.status(403).send({
            msg: err // 上面传下来的话语直接返回给前端
        })
    }
})

// 6. 配置端口号
server.listen(9001, "localhost",() => {
    console.log("访问: http://localhost:9001");
})

// 网上所谓的md5解密, 字典
// 666加密后的结果是固定的 d5ee2eedfcf7adc285db4967bd86910d -- 6666666
// 真正开发的时候:
// ppt: 后端加密是x的, 前端js对密码加密后在传递给后台