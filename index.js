const express= require("express");
const app= express();
const mongoose=require("mongoose");
const path = require("path");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

const methodOverride= require("method-override");

app.use(methodOverride("_method"));

const chat = require("./models/chat.js");

main().
then(()=>{
    console.log("connection successful");
})
.catch((err)=> console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// let chat1= new chat({
//     from: "jira",
//     to: "siri",
//     message: "send me your exam sheets",
//     created_at: new Date()
// });
// chat1.save().then((res)=>{
//     console.log(res);
// });

app.get("/chats",async (req,res)=>{
    let data= await chat.find();
    // console.log(data);
    res.render("web.ejs", {data});
});

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/chats",(req,res)=>{
    let {from,message,to}=req.body;

    let allchats = new chat({
        from:from,
        message: message,
        to: to,
        created_at: new Date(),
    });
    allchats.
    save().
    then((res)=>{
        console.log("Chat was saved");
    })
    .catch((err)=>{
        console.log(err);
    });
    
    res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req,res)=>{
    let {id}= req.params;
    let chat1 = await chat.findById(id);
    res.render("edit.ejs", {chat1});
})

app.put("/chats/:id",async(req,res)=>{
    let {id}= req.params;
    let { message: newMsg}=req.body;
    let updateChat= await chat.findByIdAndUpdate(
        id,
        {message:newMsg}
        ,{runValidators:true , new :true}
    );
    console.log(updateChat);
    res.redirect("/chats");
})

app.get("/",(req,res)=>{
    res.send("server is working");
})

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
})