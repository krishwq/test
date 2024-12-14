const express=require('express');
const fs=require('fs');
const path = require('path');
const multer=require('multer');
const bodyParser = require("body-parser");
const app=express();
const port=80;
// Middleware
app.use(bodyParser.urlencoded({ extended: true })); //for parse data

// Set up storage for file uploads using multer
const upload = multer({ dest: 'uploads/' });

// Serve static files
app.use("/uploads", express.static("uploads"));

//PUG
app.set("view engine", "pug"); //set the pug
app.set("views", path.join(__dirname, "views")); //set views directory

app.get('/',(req,res)=>{
    res.render('index.pug');
});

app.post('/submit',upload.single('textfile'),  (req,res)=>{
    let filepath=req.file.path;
    // let cont=fs.readFileSync(filepath,'utf-8');
    fs.appendFile(filepath,'--updated',(err)=>{
        if (err)
            console.log(err);
    });
    // fs.unlink(filepath,(err)=>{
    //     if(err)
    //     console.log(err)});
    res.status(200).render('index.pug',{"filepath":filepath});
    // res.send(cont);
    // res.download(filepath,(err)=>{
    //     if(err)
    //         console.log(err);
    //     fs.unlink(filepath,(err)=>{
    //         if(err)
    //         console.log(err)});
    // });
    })

app.listen(port,()=>{
    console.log('server is running');
})