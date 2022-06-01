
const multer = require('multer');
const path = require('path')

const Storage = multer.diskStorage({
    destination:'./src/public/images',
    filename:(req,file,cb)=>{
        cb(null , file.fieldname + '_' + Date.now() +  '_'+  file.originalname + path.extname(file.originalname));
    }
})

var upload = multer({
    storage: Storage,
}).single('image');

module.exports = upload;




