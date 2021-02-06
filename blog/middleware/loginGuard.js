const guard = (req, res, next) => {
    //判断用户访问的是不是登录页面
    //判断登录状态
    if (req.url !== '/login' && !req.session.username) {
        res.redirect('/admin/login');

    } else {
        next();
    }

}
module.exports = guard;