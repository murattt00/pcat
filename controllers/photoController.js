const Photo = require('../models/Photo');
const fs = require('fs');
const path = require('path'); 


exports.CreatePhoto = async (req, res) => {

    const uploadDir = 'public/uploads';
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
    }
    let uploadedImage = req.files.photo;
    let ImagePath = path.join(__dirname, '/../public/uploads', uploadedImage.name);
    uploadedImage.mv(ImagePath, async () =>{
     await Photo.create({
        ...req.body,
        image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
});
};

exports.EditPhoto = async (req, res) =>{
    await Photo.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        dateCreated: Date.now()
    });
    res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) =>{
    const photo = await Photo.findById(req.params.id);
    let deletedimage = __dirname + '/../public' + photo.image;
    if (fs.existsSync(deletedimage)) {
        fs.unlinkSync(deletedimage);
    }
    
    await Photo.findByIdAndDelete(req.params.id);

    res.redirect(`/`);
};
