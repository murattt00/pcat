const Photo = require('../models/Photo');


exports.getHomePage = async  (req,res)=>{
    const page = req.query.page ||1;
    const photosPerPage = 6;

    const totalPhotos = await Photo.find().countDocuments();
    const photos = await Photo.find().sort('-dateCreated').skip( (page - 1)*photosPerPage).limit(photosPerPage);
    res.render('index', { 
        photos,
        currentPage: page,
        totalPages: Math.ceil(totalPhotos / photosPerPage)
    });
};

exports.getAboutPage =  (req, res) => {
    res.render('about');
};

exports.getAddPhotoPage =  (req, res) => {
    res.render('add_photo');
};

exports.GetPhotoPage =  async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo-page', { photo });
};

exports.getEditPhotoPage = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('edit', { photo });
};
