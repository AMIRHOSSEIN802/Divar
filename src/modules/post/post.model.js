const { Schema, Types, model } = require("mongoose");

const PostSchema = new Schema({
    title : {type: String , required : true},
    userId: {type: Types.ObjectId, required: true},
    content: {type: String , required : true},
    category: {type: Types.ObjectId , ref : "Category" ,required: true},
    province : {type : String , required: false},
    city: {type: String , required: false},
    district: {type: String , required : false},
    address: {type: String, required: false},
    coordinate: {type: [Number], required: true},  //51.15895487, 52.36984685
    images: {type : [String] , required: false , default: []},
    options : {type : Object , default : {}}
},{
    timestamps: true
})

const PostModel = model("Post" , PostSchema)

module.exports = PostModel