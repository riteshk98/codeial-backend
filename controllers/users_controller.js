const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title:"Profile"
    } );
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:"Codeial | SignIn"
    });
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:"Codeial | SignUp"
    });
}

//get signup data

module.exports.create=function(req, res){
    console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email}).then((user)=>{
        if(!user){
            User.create({
                ...req.body
            }).then((result)=>{
                return res.redirect('/users/sign-in');
            }).catch((err)=>{
                console.log('err in creating user');
            })
        }

    }).catch((err)=>{
        console.log('err in finding user');
    }); 


};
//signin & create Session
module.exports.createSession = function(req, res){
    return res.redirect('/');


};

module.exports.destroySession = function(req,res, next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}