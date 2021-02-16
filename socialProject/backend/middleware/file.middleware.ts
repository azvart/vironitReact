import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const path:any=   `../client/public/img/photos/${req.params.id}`;
 
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
        cb(null, path);
    },
    filename: function(req, file, cb) {   
        cb(null, req.params.id + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req:any, file:any, cb:any) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({dest:'photos',storage,fileFilter});
export default upload;