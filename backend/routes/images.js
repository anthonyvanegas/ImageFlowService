require('dotenv').config();

const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);
        res.status(200).json({ url: result.secure_url });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).send('Error uploading image');
    }
});

router.get('/:imageId', async (req, res) => {
    try {
        const imageId = req.params.imageId;
        const imageData = await cloudinary.api.resource(imageId);
        const imageURL = await cloudinary.image(imageData.url, {transformation: [{fetch_format: "jpg"}]})
        res.status(200).json(imageURL);
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).send('Error retrieving image');
    }
});

module.exports = router;