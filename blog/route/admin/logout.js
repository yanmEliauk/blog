module.exports = (req, res) => {
    //删除session和cookie， 重定向到登录页面
    req.session.destroy(function () {
        //删除cookie
        res.clearCookie('connect.sid');

        res.redirect('/admin/login');
    });

}