import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
    token:{
        type: String,
        required: [true, 'Token is required to be added to the blacklist']
    },
   
},{
    timestamps: true
})

//Time to live for the blacklisted token, default is 7 days
blacklistSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

const BlackList = mongoose.model('BlackList', blacklistSchema);

export default BlackList;