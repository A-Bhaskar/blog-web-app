var express  =  require("express");
var router   =  express.Router({mergeParams: true});
var Tour = require("../models/tour");
var Comment = require("../models/comment");
var middleware = require("../middleware"); //middleware automatically search in index file thats why no need of middleware/index

router.get("/tourplace/:id/comments/new", middleware.isLoggedIn, function(req,res){
    Tour.findById(req.params.id, function(err,tour){
        if(err){
            console.log(err);
        }else{
            res.render("newcomment",{tour:tour});
        }
    });
});
router.post("/tourplace/:id/comments", middleware.isLoggedIn,function(req,res){
    Tour.findById(req.params.id, function(err ,tour){
        if(err){
            console.log(err);
            res.redirect("/tourplace");
        }
        else{
              Comment.create(req.body.comment, function(err , comment){
                    if(err){
                        console.log(err);
                    } else{
                         comment.author.id = req.user._id;
                         comment.author.username = req.user.username;
                         comment.save();
                         tour.comments.push(comment);
                         tour.save();
                         req.flash("success","Successfully added comment");
                         res.redirect("/tourplace/" + tour._id);
                    }
              });
        }
    });
});

// EDIT THE COMMENT
router.get("/tourplace/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,  function(req,res){
   Comment.findById(req.params.comment_id,function(err,foundComment){
       if(err){res.redirect("back");}
       else{ res.render("editcomments",{tour_id:req.params.id,comment:foundComment});
    }
   })
})

// UPDATE COMMENT
router.put("/tourplace/:id/comments/:comment_id",middleware.checkCommentOwnership,  function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id , req.body.comment ,function(err,updatedComment){
       if(err){res.redirect("back");}
       else{
           res.redirect("/tourplace/" + req.params.id);
       }
   })
})

//COMMENT DESTROY ROUTE

router.delete("/tourplace/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/tourplace/" + req.params.id);
        }
    })
})

// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
//  }
//  //middleware for authorsation
//  function checkCommentOwnership( req,res,next){
//     if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id, function(err,found){
//             if(err){
//                 res.redirect("back");
//             }else{
//                 if(found.author.id.equals(req.user._id)){
//                     next();
//                 }
//                 else{
//                    res.redirect("back");
//                 }
//                }
//            });     
//        } 
//     else{
//         res.redirect("back");
//     }
// }

module.exports = router; 

//===========================================
// IN ALL FUNCTION I USED FOUND WHICH CONTAINS DATA REGARDING
// THAT CALLBACK DATA LIKE COMMENT CALLBACK COMMENT DATA OF THAT PERTICULAR ID
//===================================================================