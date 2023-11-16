const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: './upload' });
require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

router.post('/api/images/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.json({ url: result.secure_url });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).send('Error uploading image');
    }
});

router.post('/convert', async (req, res) => {
  
});

router.get('/status/:imageId', async (req, res) => {
  
});

router.get('/:imageId', async (req, res) => {
  
});

module.exports = router;