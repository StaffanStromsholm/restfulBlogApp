const express = require('express'),
    mongoose = require('mongoose'),
    multer = require('multer'),
    GridFsStorage = require('multer-gridfs-storage'),
    Grid = require('gridfs-stream'),
    

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({ storage });

module.exports = GridFsStorage.model("Image", storage);
module.exports = upload;