const { Article } = require('../../model/article');


module.exports = async (req, res) => {
    // 获取页码值
    const page = req.query.page;

    // 从数据库中查询数据
    let result = await Article.find().populate('author').lean();

    // res.send('欢迎来到博客首页')
    // 渲染模板并传递数据
    res.render('home/default.art', {
        result: result
    });
}