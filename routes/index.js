var express  =  require("express");
var router   =  express.Router();
var passport = require("passport");
var User     = require("../models/user");

router.get("/landing",function(req,res){
    res.render("landing");
});



//============
//AUTH ROUTES
//============

//show register form

router.get("/register",function(req,res){
   res.render("register");
});

router.post("/register",function(req,res){
   var newuser = new User({username: req.body.username});
   User.register(newuser, req.body.password, function(err,user){
       if(err){
           console.log(err);
           req.flash("error", "err.message");
           return res.redirect("/register");
       }
       passport.authenticate("local")(req,res,function(){
           res.redirect("/tourplace");
       });
   });
});

//LOGIN LOGIC
router.get("/login",function(req,res){
   res.render("login");
})
router.post("/login", passport.authenticate("local",
   {
       successRedirect : "/tourplace",
       failureRedirect: "/login"
   
   }),function(req,res){});

// logout logic
router.get("/logout",function(req,res){
   req.logout();
   req.flash("error","Logged You Out!")
   res.redirect("/tourplace");
}) 

// function isLoggedIn(req,res,next){
//    if(req.isAuthenticated()){
//        return next();
//    }
//    res.redirect("/login");
// }

module.exports = router;