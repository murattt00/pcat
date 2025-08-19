const express = require('express');
const path = require('path'); 
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const port = 3000;

app.get('/', (req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'public/index.html'));
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add_photo', (req, res) => {
    res.render('add_photo');
});

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`)
});
