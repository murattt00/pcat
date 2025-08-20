const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path'); 
const ejs = require('ejs');
const fs = require('fs');
const Photo = require('./models/Photo'); // Import the Photo model



const app = express();
mongoose.connect('mongodb://localhost/pcat-test-db');



// Template engine 
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
 
const port = 3000;

app.get('/',async  (req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'public/index.html'));
    const photos = await Photo.find().sort('-dateCreated');
    res.render('index', { photos });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add_photo', (req, res) => {
    res.render('add_photo');
});

app.get('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo-page', { photo });
});

app.post('/photos', async (req, res) => {

    const uploadDir = 'public/uploads';
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
    }

    let uploadedImage = req.files.photo;
    let ImagePath = path.join(__dirname, 'public/uploads', uploadedImage.name);

    uploadedImage.mv(ImagePath, async () =>{
     await Photo.create({
        ...req.body,
        image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
});
});

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
});
