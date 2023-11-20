require('dotenv').config();

const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const ImageDetail = require('../models/ImageDetail');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true,
});

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const imageDetail = new ImageDetail({
            title: req.body.title,
            description: req.body.description,
            imageId: result.public_id,
        });
        imageDetail.save().then(imageUpload => {
            res.status(200).json({
                title: imageUpload.title,
                description: imageUpload.description,
                imageId: result.public_id,
                width: result.width,
                height: result.height,
                format: result.format,
                url: result.url,
                created_at: result.created_at,
            });
        }).catch(err => {
            console.error(err);
            res.status(500).send({
                message: "Error while posting image details to database",
                statusCode: 500
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Error while connecting to image hosting service",
            statusCode: 500
        });
    }
});

router.get('/:imageId', async (req, res) => {
    try {
        const imageId = req.params.imageId;
        const imageData = await cloudinary.api.resource(imageId);
        const imageURL = await cloudinary.image(imageData.url, {transformation: [{fetch_format: "jpg"}]})
        ImageDetail.findOne({imageId: imageId}).then(imageUpload => {
            res.status(200).json({
                title: imageUpload.title,
                description: imageUpload.description,
                imageId: imageData.public_id,
                width: imageData.width,
                height: imageData.height,
                format: "jpg",
                url: imageURL,
                created_at: imageData.created_at,
            });
          }).catch(err => {
            console.error(err);
            res.status(500).send({
                message: "Error while connecting and searching for image details in database",
                statusCode: 500
            });
          });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Error while connecting to image hosting service",
            statusCode: 500
        });
    }
});

module.exports = router;