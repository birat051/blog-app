const { Storage } = require('@google-cloud/storage');
const Image=require('../models/ImageStorage')

const path = require('path');

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.SERVICE_ACCOUNT_PATH,
});

const bucketName = process.env.STORAGE_BUCKET_NAME;
const bucket = storage.bucket(bucketName);



exports.storeImage= async (req,res)=>{
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const file = bucket.file(req.file.originalname);

    const blobStream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
    
    blobStream.on('error', (err) => {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while uploading the image.' });
    });
    
    blobStream.on('finish', async () => {
        try{
        const imageUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;
        
        const image = await Image.create({
          filename: req.file.originalname,
          imageUrl: imageUrl,
        });
        if(image)
        res.status(201).json({ imageUrl });
        else
        res.status(500).json({ message: 'An error occurred while saving the image information.' });
    }
    catch(error)
    {
        res.status(500).json({ message: 'An error occurred while saving the image information.' });
    }
      });
    blobStream.end(req.file.buffer);
}