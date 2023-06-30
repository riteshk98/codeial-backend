const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            console.log("Invalid Username/Password");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          if (err) {
            console.log("Error in finding user--Passport");
            return done(err);
          }
        });
      // User.findOne({email:email},function(err,user){
      //     if(err){
      //         console.log('Error in finding user--Passport');
      //         return(done(err));
      //     }
      //     if(!user || user.password != password){
      //         console.log('Invalid Username/Password');
      //         return done(null, false);
      //     }
      //     return done(null,user);
      // })
    }
  )
);

//serialize-add to cookie
passport.serializeUser(function(user,done){
    console.log('Here');
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id).then((user)=>{
        return done(null, user);
    }).catch((err)=>{
        console.log('Err in finding user');
        return(done(err));
    })

});

passport.checkAuthentication = function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  return res.redirect('/users/sign-in');
}
passport.setAuthUser=function(req,res,next){
  if(req.isAuthenticated()){
    res.locals.user = req.user;
  }
  next();

}

module.exports = passport;