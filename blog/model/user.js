const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        //保证邮箱地址不重复
        unique: true

    },
    password: {
        type: String,
        required: true
    },

    role: {
        //admin为超级管理员
        //norma为普通用户
        type: String,
        required: true
    },
    //0启用，1禁用
    state: {
        type: Number,
        default: 0
    }

});

const User = mongoose.model('User', userSchema);

// User.create({
//     username: 'Onenote',
//     email: 'onenote@123.cn',
//     password: '123456',
//     role: 'admin',
//     state: 0
// }).then(() => {
//     console.log('用户创建成功');

// }).catch(() => {
//     console.log('用户创建失败');

// })


async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'iteheima',
        email: 'itheima@itcast.cn',
        password: pass,
        role: 'admin',
        state: 0
    });
}

// createUser();

// 验证用户信息
const validateUser = user => {
    // 定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };

    // 实施验证
    return Joi.validate(user, schema);
}

module.exports = {
    User,
    //等价于User:User
    validateUser
}