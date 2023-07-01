const Post = require('../models/posts');


module.exports.home = function(req,res){
    Post.find().populate('user').then((result)=>{
        return res.render('home', {
            title:"Home",
            posts:result
        });
    }).catch((err)=>{
        return console.log(err);
    })
    
}