require('dotenv').config();

const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true,
});

router.get('/health', async (req, res) => {
    try {
        const imageData = await cloudinary.api.resource("sample");
        const imageURL = cloudinary.image(imageData.url);
        res.status(200).json({
            status: "Ok",
            statusCode: 200,
            message: "ImageFlowService is up and running",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).send({
            status: "Down",
            statusCode: 503,
            message: "ImageFlowService temporarily unavailable",
            timestamp: new Date().toISOString()
        });
    }
});

module.exports = router;