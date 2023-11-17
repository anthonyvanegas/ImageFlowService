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
        res.status(200).json({
            imageId: result.public_id,
            width: result.widgth,
            height: result.height,
            format: result.format,
            url: result.url,
            created_at: result.created_at,
            statusCode: 200
        });
    } catch (error) {
        res.status(500).send({statusCode: 500});
    }
});

router.get('/:imageId', async (req, res) => {
    try {
        const imageId = req.params.imageId;
        const imageData = await cloudinary.api.resource(imageId);
        const imageURL = await cloudinary.image(imageData.url, {transformation: [{fetch_format: "jpg"}]})
        res.status(200).json({
            imageId: imageData.public_id,
            width: imageData.width,
            height: imageData.height,
            format: "jpg",
            url: imageURL,
            created_at: imageData.created_at,
            statusCode: 200
        });
    } catch (error) {
        res.status(500).send({statusCode: 500});
    }
});

module.exports = router;