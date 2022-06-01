const mongoose = require("mongoose");

const friendSchema = mongoose.Schema({
    userId: {
        type: "ObjectID",
        required: true,
        ref:'user'
    },
    friendId: {
        type: "ObjectId",
        default:null,
        ref:'user'
    },
    requestTo: {
        type: "ObjectId",
        ref: 'user'
    },
    accepted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

module.exports = mongoose.model("friend", friendSchema);