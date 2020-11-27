var express = require("express"),
    passport = require("passport"),
    LocalStrategy = require("passport-local");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var flash = require("connect-flash");
var Tour = require("./models/tour");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var User = require("./models/user");
var methodOverride = require("method-override");
mongoose.connect('mongodb://localhost:27017/tourplace_v7', {useNewUrlParser: true, useUnifiedTopology: true});
//seedDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash()); 
const port = 3000;
app.set("view engine","ejs");

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I dont Know how can i write it",
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var  commentRoutes = require("./routes/comments"),
     tourplaceRoutes = require("./routes/tourplace"),
     indexRoutes    =  require("./routes/index");

//===================================
// logged in user info 
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//====================================


app.use(indexRoutes);
app.use(tourplaceRoutes);
app.use(commentRoutes);


app.listen(port,()=>{
     return console.log("port is workinng!!");
}); 