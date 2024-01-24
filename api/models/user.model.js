import  mongoose  from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://assets.nick.com/uri/mgid:arc:imageassetref:shared.nick.us:141ea49d-f2d7-44a2-b65e-ef7516923187?quality=0.7&gen=ntrn&legacyStatusCode=true"
    },
}, {timestamps:true})

const User = mongoose.model('User', userSchema)
export default User