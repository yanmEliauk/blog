const { User } = require('../../model/user')



module.exports = async (req, res) => {
    // res.send('ok')
    //获取要删除的用户id

    await User.findByIdAndDelete({ _id: req.query.id });
    res.redirect('/admin/user');
}