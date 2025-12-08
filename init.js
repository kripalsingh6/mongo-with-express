const mongoose=require("mongoose");

const chat = require("./models/chat.js");

main().
then(()=>{
    console.log("connection successful");
})
.catch((err)=> console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

 let chats=([
    {
    from: "jira",
    to: "siri",
    message: "send me your exam sheets",
    created_at: new Date()
},
{
    from: "hira",
    to: "ramlal",
    message: "hello ramlal",
    created_at: new Date()
},
{
    from: "madhu",
    to: "madhur",
    message: "hey i like u madhur",
    created_at: new Date()
},
{
    from: "abhisek",
    to: "nitin",
    message: "send me your vacation plan",
    created_at: new Date()
},
{
    from: "aman",
    to: "arpit",
    message: "arpit whats going on",
    created_at: new Date()
},
{
    from: "kt",
    to: "goldy",
    message: "goldy bhai always maintain your power",
    created_at: new Date()
},
{
    from: "viru",
    to: "yuvi",
    message: "congrats to hit six sixs",
    created_at: new Date()
},
]);

  chat.insertMany(chats);