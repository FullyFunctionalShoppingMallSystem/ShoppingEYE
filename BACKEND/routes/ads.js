const router = require("express").Router();
let Ads =require("../models/Ads");
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

   router.route('/addAds').post(upload.single('image'),(req,res)=>{
    const ads= new Ads({
       image : {
        data: fs.readFileSync('uploads/' + req.file.filename),
        contentType: "image/png"
    },
    shopName:req.body.shopName,
    description : req.body.description,
    date : req.body.date,
      
    });
    ads.save()
    .then(() => {
      res.json("Advertisment details added");
    })
    .catch((err) => {
      console.error("Error adding Advertisment details:", err);
      res.status(500).json({ error: "Server error" });
    });
  
   })

// Read function 
router.route("/").get(async (req, res) => {
    try {
      const ads = await Ads.find(); // Exclude the image field
  
      // Check if there are any ads in the database
      if (!ads || ads.length === 0) {
        return res.status(404).json({ error: "No Shop found" });
      }
  
      // Send the entire array of ads in the response
      res.json(ads);
    } catch (error) {
      console.error("Error fetching Advertisment details:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

// Fetching a Shop using name
router.route("/get/:shopName").get(async (req, res) => {
    let name = req.params.shopName;

    // Use a case-insensitive regular expression for the search
    const caseInsensitiveRegex = new RegExp('^' + name + '$', 'i');

    try {
        const ads = await Ads.findOne({ shopName: caseInsensitiveRegex });
        res.json(ads); // Success
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" }); // Handle the error and send a response
    }
});


   //Delete function

 router.route("/delete/:id").delete(async (req, res) => {
    try {
      let ads = req.params.id;
      const deletedAds = await Shop.findByIdAndDelete({ id: ads });
  
      if (deletedAds) {
        res.json("Advertisment details deleted");
      } else {
        res.status(404).json({ message: `Product ${ads} does not exist` });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while deleting the Advertisment" });
    }
  });

  

module.exports = router;