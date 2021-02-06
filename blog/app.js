const express = require('express');
const path = require('path');
const bodyPaser = require('body-parser');
const session = require('express-session');
const template = require('art-template');
const dateFormat = require('dateformat');
const morgan = require('morgan');
const config = require('config');


const app = express();

require('./model/connect');
//处理post请求参数
app.use(bodyPaser.urlencoded({ extended: false }))
//配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));


//告诉express模板所在的位置
app.set('views', path.join(__dirname, 'views'))
//告诉express模板的默认后缀是
app.set('view engine', 'art');
//当渲染后缀为art的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
//向模板内倒入dataformat变量
template.defaults.imports.dateFormat = dateFormat;

app.use(express.static(path.join(__dirname, 'public')));

//如果都没有值，则显示default.json的内容
console.log(config.get('title'));



//获取系统环境变量
if (process.env.NODE_ENV == 'development') {
    //在开发环境，将客户端发送到服务器端的请求信息打印到控制台
    app.use(morgan('dev'))
} else {

}



const home = require('./route/home');
const admin = require('./route/admin');


//拦截请求 判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'))

//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    // 将字符串对象转换为对象类型
    // JSON.parse() 
    // const result = JSON.parse(err);
    const result = err;
    // {path: '/admin/user-edit', message: '密码比对失败,不能进行用户信息的修改', id: id}
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})


app.listen(3000);
console.log('网站服务器启动成功，请访问localhost:3000');
