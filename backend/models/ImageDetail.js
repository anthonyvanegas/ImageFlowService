const mongoose = require('mongoose');

const imageDetailSchema = mongoose.Schema({
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageId: { type: String, required: true }
});

module.exports = mongoose.model('ImageDetail', imageDetailSchema);