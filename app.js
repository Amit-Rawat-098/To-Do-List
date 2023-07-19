const bodyParser = require("body-parser");
const express=require("express");
var app=express();
const mongoose= require("mongoose");
mongoose.connect("mongodb+srv://admin-Amit:Amit-123@cluster0.adyntyz.mongodb.net/toDoListDB");

const itemSchema= new mongoose.Schema({
    name: String
});

const Items=mongoose.model("Item",itemSchema);

const wakeUpEarly= new Items({
    name: "Wake Up Early"
});
const Study=new Items({
    name:"Study"
});
const workOut=new Items({
    name: "Work Out"
});

// Daily model

const Daily=mongoose.model("daily",itemSchema);
const wakeUp= new Daily({
    name: "Wake Up Early"
});
const study=new Daily({
    name:"Study"
});
const workout=new Daily({
    name: "Work Out"
});

// custum schema

const custom =new mongoose.Schema({
    name: String
});

const customItem=mongoose.model("Custom", custom);



const date=require(__dirname+"/day.js");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.set('view engine', 'ejs');



// var dailyItems=["Study","Workout"];

app.get("/",function(req,res){
let day= date();
Items.find(function(err,item){
   if(item.length===0){
    Items.insertMany([wakeUpEarly,Study,workOut],function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Added succesfully");
        }
        res.redirect("/");
    });
   }else{
    res.render("list",{presentDay:day, newItems: item, link:"/"});
   }
});
});

app.get("/daily",function(req,res){
    Daily.find(function(err,dailyItem){
        if(dailyItem.length===0){
            Daily.insertMany([wakeUp,study,workout], function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Added succesfully");
                }
                res.redirect("/daily");
            });
        }else{
            res.render("list",{presentDay:"Daily Task", newItems: dailyItem, link:"/daily"});
        }
    });

});


app.get("/:test", function(req,res){
 const custom = req.params.test;
 customItem.find(function(err,element){
 if(err){
    console.log(err);
 }else{
    console.log("Nice");
    res.render("list",{presentDay: custom,newItems:element ,link:"/"+custom  });
 }
 })

});

// app.post("/:test", function(req,res){
//     const custom = req.params.test;
//     customItem.find(function(err,element){
//     if(err){
//        console.log(err);
//     }else{
//        console.log("Nice");
//        res.render("list",{presentDay: custom,newItems:element ,link:"/custom"  });
//     }
//     })
   
//    });

app.post("/daily",function(req,res){
    const newItem=req.body.addItem;

    const Additem = new Daily({
        name: newItem
    });

   Additem.save();
        res.redirect("/daily");
    
});

app.post("/",function(req,res){
    const newItem=req.body.addItem;

    const Additem = new Items({
        name: newItem
    });

   Additem.save();
    res.redirect("/");
});

app.post("/delete",function(req,res){
    const checked = req.body.checkBox;
    Items.deleteOne({_id:checked},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Deleted");
        }
    });
    res.redirect("/");
});

app.listen(3000,function(){
console.log("Working fine");
});