var express  =  require("express");
var router   =  express.Router();
var Tour     =  require("../models/tour");
var middleware = require("../middleware"); //middleware automatically search in index file thats why no need of middleware/index

router.get("/tourplace",function(req,res){
    
    //res.render("tourplace",{tour:tour});
    Tour.find({},function(err,Tours){
         if(err)
         {
             console.log(err);
         }
         else{
             res.render("tourplace",{tour:Tours});
         }
    });
});
router.post("/tourplace",middleware.isLoggedIn, function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var dcrp = req.body.discription;
   var author = {
       id: req.user._id,
       username:req.user.username
   }
   console.log(req.user);
   var newplace={name: name , image: image, discription: dcrp, author:author};
   Tour.create(newplace,  function(err,newplace)
   {
       if(err)
       {
           console.log(err); 
       }
       else{
        res.redirect("/tourplace");
        console.log(newplace);
       }
   });
   //res.redirect("/tourplace");
});
router.get("/tourplace/new",middleware.isLoggedIn, function(req,res){
   res.render("new.ejs");
});

//SHOW-show info
router.get("/tourplace/:id",function(req,res){
     Tour.findById(req.params.id).populate("comments").exec (function(err,found){
         if(err){
             console.log(err);
         }
         else{
             res.render("show",{tour:found});
         }
     });
});

// EDIT CAMPGROUND ROUTE
router.get("/tourplace/:id/edit" ,middleware.checkTourOwnership,  function(req,res){
    Tour.findById(req.params.id , function(err,found){
        if(err){
            res.redirect("/tourplace");
        }else{
            res.render("edit",{tour:found});

        }
    });
});
//UPDATE TOURPLACE
router.put("/tourplace/:id", middleware.checkTourOwnership, function(req,res){
    console.log(req.params.id);
    Tour.findByIdAndUpdate(req.params.id , req.body.tour, function(err,updatedtour){
        if(err){
            res.redirect("/tourplace");
        }
        else{
            res.redirect("/tourplace/" + req.params.id);
        }
    });
});
 
//  DESTROY TOURPLACE

router.delete("/tourplace/:id",middleware.checkTourOwnership, function(req,res){
    Tour.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/tourplace");
        }
        res.redirect("/tourplace");
    })
})

//  function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
//  }

//  // middleware for authorsation
//  function checkTourOwnership( req,res,next){
//      if(req.isAuthenticated()){
//          Tour.findById(req.params.id, function(err,found){
//              if(err){
//                  res.redirect("back");
//              }else{
//                  if(found.author.id.equals(req.user._id)){
//                      next();
//                  }
//                  else{
//                     res.redirect("back");
//                  }
//                 }
//             });     
//         } 
//      else{
//          res.redirect("back");
//      }
//  }
module.exports = router; 