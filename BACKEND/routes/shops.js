const router = require("express").Router();
let Shop =require("../models/Shop");
const multer = require("multer");
const fs = require('fs');
const moment = require('moment');

// Set up Multer for file uploads
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'uploads')
    },
    filename : (req,file,cb)=>
    cb(null,file.originalname)
   })
   const upload=multer({storage:storage})

   router.route('/addShop').post(upload.single('image'), (req, res) => {
    if (!req.file || !req.file.filename) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const shop = new Shop({
        storeID: req.body.storeID,
        image: {
            data: fs.readFileSync('uploads/' + req.file.filename),
            contentType: "image/png"
        },
    issuedDate : req.body.issuedDate,
    shopName : req.body.shopName,
    ownerName : req.body.ownerName,
    nic : req.body.nic,
    email : req.body.email,
    mobile : req.body.mobile,
    type:req.body.type,
    lastUpdated : req.body.lastUpdated,
      
    
    
  
    });
    shop.save()
        .then(() => {
            res.json("Shop details added");
        })
        .catch((err) => {
            console.error("Error adding shop details:", err);
            res.status(500).json({ error: "Server error" });
        });
});

// Read function 
router.route("/").get(async (req, res) => {
    try {
      const shops = await Shop.find(); // Exclude the image field
  
      // Check if there are any shops in the database
      if (!shops || shops.length === 0) {
        return res.status(404).json({ error: "No Shop found" });
      }
  
      // Send the entire array of Shops in the response
      res.json(shops);
    } catch (error) {
      console.error("Error fetching Shop details:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

// Fetching a Shop using name
router.route("/get/:shopName").get(async (req, res) => {
    let name = req.params.shopName;

    // Use a case-insensitive regular expression for the search
    const caseInsensitiveRegex = new RegExp('^' + name + '$', 'i');

    try {
        const shop = await Shop.findOne({ shopName: caseInsensitiveRegex });
        res.json(shop); // Success
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" }); // Handle the error and send a response
    }
});

// Fetching shops by type (case-insensitive)
router.route("/getTypes/:type").get(async (req, res) => {
  const type = req.params.type;

  try {
    const caseInsensitiveRegex = new RegExp('^' + type + '$', 'i'); // Case-insensitive regex
    const shops = await Shop.find({ type: caseInsensitiveRegex });
    res.json(shops); // Success
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" }); // Handle the error and send a response
  }
});



//fetching using store Id 
router.route("/getStoreId/:storeID").get(async(req,res)=>{
    let storeID=req.params.storeID;
   const shop= await Shop.findOne({ storeID: storeID }).then((shop)=>{
        res.json(shop) //success
    }).catch((err)=>{ //unsuccess
  
        console.log(err);
  
    })     
  
  }) 

   //Delete function

 router.route("/delete/:storeID").delete(async (req, res) => {
    try {
      let shop = req.params.storeID;
      const deletedshop = await Shop.findOneAndDelete({ storeID: shop });
  
      if (deletedshop) {
        res.json("Shop details deleted");
      } else {
        res.status(404).json({ message: `Product ${shop} does not exist` });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while deleting the shop" });
    }
  });

// Update shop details route
router.route("/update/:storeID").put(upload.single("image"), async (req, res) => {
  try {
      const storeID = req.params.storeID;
      const {
          shopName,
          ownerName,
          nic,
          email,
          mobile,
          type,
      } = req.body;

     
      const existingShop = await Shop.findOne({ storeID });

      if (!existingShop) {
          return res.status(404).json({ error: "Shop details not found" });
      }

      // Check if a new image was provided
      let image;
      if (req.file) {
          // If a new image is provided, update the image field
          image = {
              data: fs.readFileSync(`uploads/${req.file.filename}`),
              contentType: req.file.mimetype // Use the mimetype of the uploaded file
          };

          // Remove existing image if any
          if (existingShop.image) {
              const imagePath = `uploads/${existingShop.image.filename}`;
              if (fs.existsSync(imagePath)) {
                  fs.unlinkSync(imagePath);
              }
          }
      } else {
          // If no new image is provided, keep the existing image
          image = existingShop.image;
      }

      // Prepare update object with or without the image
      const currentTime = new Date();
      const formattedDateTime = currentTime.toLocaleString();

      const updateShop = {
          shopName,
          ownerName,
          nic,
          email,
          mobile,
          type,
          lastUpdated: formattedDateTime, 
          image, // Assign the image field
      };

      // Perform the update
      await Shop.findOneAndUpdate({ storeID }, updateShop);

      res.json("Shop details updated");
  } catch (error) {
      console.error("Error updating shop details:", error);
      res.status(500).json({ error: "Server error" });
  }
});

  
 
  


module.exports = router;

