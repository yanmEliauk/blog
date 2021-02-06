const express = require('express');

const home = express.Router();

//首页展示页面
home.get('/', require('./home/index'));

//文章详情展示页面
home.get('/article', require('./home/article'))

module.exports = home;