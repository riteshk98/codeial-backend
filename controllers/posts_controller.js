const Post = require('../models/posts');

module.exports.create = function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    }).then((result)=>{
        console.log(result);
        return res.redirect('/');
    }).catch((err)=>{
        return console.log('err in creating post');
    })
}