var Tour = require("../models/tour");
var Comment = require("../models/comment");
//all middlware goes here
var middlewareObj = {};

middlewareObj.checkTourOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Tour.findById(req.params.id, function(err,found){
            if(err){
                res.redirect("back");
            }else{
                if(found.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You don't have permission to do that")
                   res.redirect("back");
                }
               }
           });     
       } 
        else{
            req.flash("error","You need to be logged in to do that");
            res.redirect("back");
        }
    
}
middlewareObj.checkCommentOwnership = function( req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err,found){
            if(err){
                res.redirect("back");
            }else{
                if(found.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You don't have permission to do that");
                   res.redirect("back");
                }
               }
           });     
       } 
    else{
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login First!")
    res.redirect("/login");
 }
 
 module.exports = middlewareObj;