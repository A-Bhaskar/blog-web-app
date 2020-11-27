
var mongoose = require("mongoose");
var Tour = require("./models/tour");
var Comment = require("./models/comment");
var data = [
    {
        name: "Green Forest",
        image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        discription:"a beautiful place where u can find ur eternal peace"
    },
    {
        name: "Flower Land",
        image:"https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        discription:"a beautiful place where u can find ur eternal peace"
    },
    {
        name: "Bridge Of Love",
        image:"https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        discription:"a beautiful place where u can find ur eternal peace"
    }
]

function seedDB(){
    Tour.remove({},function(err){
        if(err){console.log(err);}
        console.log("Removed Tours");
         data.forEach(function(seed){
             Tour.create(seed,function(err,tour){
                 if(err){console.log(err);}
                 else{console.log("Content added");
                    // console.log(tour);
                     //tour.comments=[];
                     Comment.create(
                         {
                             text:"Beautiful place",
                             author:"kk"
                         }, function(err,comment)
                         {
                             if(err){console.log(err);}
                             else{
                               tour.comments.push(comment);
                               tour.save();
                                //console.log(comment);
                            }
                        }
                     );
             }
             });
        });
    });

}
module.exports = seedDB;