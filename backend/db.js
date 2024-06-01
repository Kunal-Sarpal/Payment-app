const { lstatSync } = require('fs');
const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://sarpalkunal7:kunal1234@cluster1.pc6dcst.mongodb.net/paytm")

const userSchema = mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String,
})

const User = mongoose.model("User",userSchema);

mongoose.exports = {
    User
}