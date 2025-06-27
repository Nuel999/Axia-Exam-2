const mongoose = require ("mongoose");

const postSchema = new mongoose.Schema (
    {
        title:{
            type: String,
            required: true,
        },
        desc:{
            type: String,
            required: true,
        },
        previewPix:{
            true: String,
            required: true,
        },
        detailedPic: {
            type: String,
            required: true,
        },
        creator: {
            type:mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },

    },
    {timestamps:true}
)

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel