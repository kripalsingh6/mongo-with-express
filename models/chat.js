const mongoose=require("mongoose");

const chatSchema= new mongoose.Schema({
    from : {
        type: String,
        required: true
    },
    to : {
        type: String,
        required: true
    },
    message: {
        type : String,
        maxLength : 50
    },
    created_at : {
        type : Date,
        required: true
    },

});
const Chating = mongoose.model("Chat",chatSchema);

module.exports =Chating;