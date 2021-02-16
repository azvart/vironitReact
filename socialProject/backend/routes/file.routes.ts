import express from 'express';
import upload from '../middleware/file.middleware';

import {UploadPhoto,
    FileTokenVerification,
    
} from '../controllers/file.controllers';

const Gallery = express.Router();
Gallery.use(FileTokenVerification);

Gallery.post('/photos/:id',upload.single('photos'),UploadPhoto)




export default Gallery;