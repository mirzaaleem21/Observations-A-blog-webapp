require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require('mongoose')
const Post=require('./models/posts')
const Contact=require('./models/contacts')





const app = express();
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));





mongoose.connect(process.env.DBURL,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true
})




app.get("/", async(req,res)=>{
  const posts= await Post.find().sort({createdAt:'desc'});
  res.render("home",{posts:posts,email:process.env.EMAIL});

})


app.get("/about",(req,res)=>{

  res.render("about",{email:process.env.EMAIL});
})

app.get("/contact",(req,res)=>{

  res.render("contact",{email:process.env.EMAIL});
  });


app.get("/compose",(req,res)=>{
  res.render("compose")
})


app.get("/posts/:postId",async(req,res)=>{

    const post=await Post.findById(req.params.postId,(err,post)=>{

      if(!err){    res.render('./post',{post:post,email:process.env.EMAIL})
    }
    else{console.log(err);}

    });

})


app.post("/contact",async(req,res)=>{

  let contact= new Contact({
    name:req.body.name,
    email:req.body.email,
    message:req.body.message
  });


  try{
    contact= await contact.save();
    res.redirect('/');
  }
  catch(e){
    console.log(e);
    res.render('./contact',{contact:contact})
  }



})

app.post("/", async(req,res)=>{

    let post= new Post({
      title:req.body.newTitle,
      content:req.body.newContent,
      createdAt:req.body.createdAt,
      markdown:req.body.markdown,
    })

    try{
      post= await post.save();
      res.redirect('/');
    }
    catch(e){
      console.log(e);
      res.render('./compose',{post:post})
    }
  



})










let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server started succesfully");
}); 