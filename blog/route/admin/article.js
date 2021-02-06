const { Article } = require('../../model/article');

module.exports = async (req, res) => {

    //表示当前访问文章管理页面
    req.app.locals.currentLink = 'article';




    let articles = await Article.find().populate('author').lean();
    // articles = JSON.stringify(articles);
    // articles = JSON.parse(articles);

    // res.render('admin/article.art');

    res.render('admin/article.art', {
        articles: articles
    });

}