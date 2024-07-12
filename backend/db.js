const { lstatSync } = require('fs');
const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://sarpalkunal7:kunal1234@cluster1.pc6dcst.mongodb.net/paytm_backend");

mongoose.connection.on("connected", ()=>{
    console.log("Database connection established")
});
mongoose.connection.on("error", (err)=>{
    console.log("Database connection is not established " + err.message)
});

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model("User",userSchema);

const Account = mongoose.model('Account', accountSchema);

module.exports = {
	Account,
    User
}