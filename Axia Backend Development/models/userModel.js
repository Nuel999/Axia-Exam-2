const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    email: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    gender: {
        type: Boolean,
        required: true,
        enum:["Male", "Female"]
    },
    hobbies: {
        type:[String],
    },
    kyc: {
        type: mongoose.Types.ObjectId,
        ref: "Kyc",
    },
    posts: [{type: mongoose.Types.ObjectId, ref:"Post"}]

},

{ timestamps: true}

);

const userModels = mongoose.model("User", userSchema);

module.exports = userModels