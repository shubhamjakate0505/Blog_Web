const express=require("express");
const app=express();
const path=require("path")
const {v4:uuidv4}=require('uuid')
const methodoverride=require("method-override")


const port=8080;
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))

let posts=[
    {
        id:uuidv4(), 
        username:"shubham",
        content:"Good Boy"
    },
    {
        id:uuidv4(),
        username:"Ashwini",
        content:"My Friend"
    },
    {
        id:uuidv4(),
        username:"Sakshi",
        content:"Gooo grils"
    },{
         id:uuidv4(),
        username:"rahul",
        content:"okay"
    }
]
//GET
app.get("/posts",(req,res)=>{
    res.render("home.ejs",{posts});
})

//POST
app.get("/posts/new",(req,res)=>{
    res.render("from")
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body
    let id=uuidv4()
    posts.push({id,username,content})
    res.redirect("/posts")
});

//show Route
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id)
    console.log(post)
    res.render("show.ejs",{post})
    // console.log(id)
})

//pathch

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id)
    post.content=newcontent;
    console.log(post)
    res.redirect("/posts")
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    // let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id)
    // post.content=newcontent;
    res.render("edit.ejs",{post})
    // let post=newcontent

})  
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id)
     res.redirect("/posts")
})
app.listen(port,()=>{
    console.log(`Listing on the port ${port}`)
})