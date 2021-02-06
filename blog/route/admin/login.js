const { User } = require('../../model/user');



module.exports = async (req, res) => {
    //接受请求参数
    const { email, password } = req.body;

    if (email.trim().length == 0 || password.trim().length == 0) {
        // return res.status(400).send('<h4></h4>');
        return res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
    }

    //根据邮箱地址查询用户信息
    let user = await User.findOne({ email: email });

    if (user) {
        //比对密码
        if (password == user.password) {
            //将用户名存储在请求对象中
            req.session.username = user.username;
            // res.send('登录成功')

            req.app.locals.userInfo = user;
            //重定向到用户列表页面
            res.redirect('/admin/user');
        } else {
            res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' })
        }
    } else {
        //没查到用户
        res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' })
    }

};