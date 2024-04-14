const router = require("express").Router();
let Tshirt =require("../models/Tshirts");
const multer = require("multer");
const fs = require('fs');


// Set up Multer for file uploads
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'uploads')
    },
    filename : (req,file,cb)=>
    cb(null,file.originalname)
   })
   const upload=multer({storage:storage})

   router.route('/addTshirt').post(upload.single('image'),(req,res)=>{
    const tshirt= new Tshirt({
       image : {
        data: fs.readFileSync('uploads/' + req.file.filename),
        contentType: "image/png"
    },
    email : req.body.email,
    date : req.body.date,
      
    });
    tshirt.save()
    .then(() => {
      res.json("Tshirt details added");
    })
    .catch((err) => {
      console.error("Error adding Tshirt details:", err);
      res.status(500).json({ error: "Server error" });
    });
  
   })

// Read function 
router.route("/").get(async (req, res) => {
    try {
      const tshirt = await Tshirt.find(); // Exclude the image field
  
      // Check if there are any tshirt in the database
      if (!tshirt || tshirt.length === 0) {
        return res.status(404).json({ error: "No Shop found" });
      }
  
      // Send the entire array of tshirt in the response
      res.json(tshirt);
    } catch (error) {
      console.error("Error fetching Tshirt details:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

// Fetching a tshirt using email
router.route("/get/:email").get(async (req, res) => {
    const email = req.params.email; // Extract email from request parameters

    try {
        // Find the Ads document with the specified email
        const tshirt = await Ads.findOne({ email });

        if (!tshirt) {
            // If no document is found, send a 404 status with an error message
            return res.status(404).json({ error: "T-shirt not found" });
        }

        // If the document is found, send it in the response
        res.json(tshirt);
    } catch (err) {
        console.log(err);
        // If an error occurs during database interaction, send a 500 status with an error message
        res.status(500).json({ error: "Internal Server Error" });
    }
});



  
// Schedule a task to delete all Tshirt entries after 30 seconds
setTimeout(async () => {
  try {
      await Tshirt.deleteMany({});
      console.log('All Tshirt entries deleted.');
  } catch (error) {
      console.error('Error deleting all Tshirt entries:', error);
  }
}, 30 * 1000); // Run after 30 seconds


  

module.exports = router;