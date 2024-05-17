const express = require('express');
const app = express();
const path = require('path');

const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));



// this code has the connecting to the public folder stactice file are conniting to the index file 
app.use(express.static(path.join(__dirname,'public')));

// this is the file extion to link the ejs file to link this file
app.set('view engine','ejs');


app.get("/", function (req, res) {
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files: files});
    })
});


app.get("/file/:filename", function (req, res) {
    fs.readFile(`./files/${req.params.filename}`,'utf-8',function (err,filedata) {
        res.render("show",{filename: req.params.filename, filedata: filedata})
    })  
});



app.get("/edit/:filename", function (req, res ) {
   res.render("edit",{filename: req.params.filename, filedata: req.params.filedata});
});

app.post("/edit", function (req, res ) {
  fs.rename( `./files/${req.body.previous}`, `./files/${req.body.new}`,function (err) {
    res.redirect('/')
  })
});



app.post("/create", function (req, res) {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {
            res.redirect('/')
    });
});


// app.get("/about", function (req, res) {
//     res.render("about")
// });
// app.get('/profile/:username',function (req, res) {
//     res.send(`Welcome,${req.params.username}`)
// })

// app.get('/author/:username/:age',function (req, res) {
//     res.send(`Welcome,${req.params.username} of Age ${req.params.age} `)
// })

app.listen(3000,function(){
    console.log('its running and type the localhost:/3000');
})