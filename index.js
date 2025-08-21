const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const methodOverride = require('method-override');
const pageController = require('./controllers/pageController');
const photoController = require('./controllers/photoController');



const app = express();
mongoose.connect('mongodb://localhost/pcat-test-db');



// Template engine 
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));

const port = 3000;

app.get('/', pageController.getHomePage);
app.get('/about', pageController.getAboutPage);
app.get('/add_photo', pageController.getAddPhotoPage);
app.get('/photos/:id', pageController.GetPhotoPage);
app.get('/photos/edit/:id', pageController.getEditPhotoPage);

app.post('/photos', photoController.CreatePhoto);
app.put('/photos/:id', photoController.EditPhoto);
app.delete('/photos/:id', photoController.deletePhoto);


app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
});
