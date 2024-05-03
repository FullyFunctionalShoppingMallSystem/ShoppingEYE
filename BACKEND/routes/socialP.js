// routes/socialP.js
const express = require('express');
const router = express.Router();
const SocialP = require('../models/socialP'); 
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Add an image
router.post('/addimg', upload.single('image'), async (req, res) => {
    try {
        // Upload image to Cloudinary
        const uploadRes = await cloudinary.uploader.upload(req.file.path, {folder: "socialPhotos"});

        // Get the image URL from Cloudinary response
        const imageUrl = uploadRes.secure_url;

        // Create new entry with Cloudinary image URL
        const newSocialP = new SocialP({
            imageUrl
        });

        await newSocialP.save();
        res.json({status: "Item added", imageUrl});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error adding item"});
    }
});

// View image by ID
router.get('/image/:sId', async (req, res) => {
    try {
        const socialPId = req.params.sId;
        const socialP = await SocialP.findById(socialPId);
        if (!socialP) {
            return res.status(404).json({ message: "Photo not found"});
        }
        res.json({imageUrl: socialP.imageUrl});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error"});
    }
});

// Fetch all images
router.get('/images', async (req, res) => {
    try {
      const allSocialPs = await SocialP.find({});
      const imageUrls = allSocialPs.map(socialP => ({ id: socialP._id, imageUrl: socialP.imageUrl }));
      res.json(imageUrls);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
