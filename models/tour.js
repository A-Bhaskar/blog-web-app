var mongoose = require("mongoose");
var tourschema = new mongoose.Schema({
    name : String,
    image : String,
    discription : String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports = mongoose.model("Tour",tourschema);