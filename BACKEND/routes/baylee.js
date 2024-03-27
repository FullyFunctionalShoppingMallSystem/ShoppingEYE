const router = require("express").Router();
let Baylee =require("../models/Baylee");
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

   router.route('/addItem').post(upload.single('image'),(req,res)=>{
    const item= new Baylee({
        itemId: req.body.itemId,
       image : {
        data: fs.readFileSync('uploads/' + req.file.filename),
        contentType: "image/png"
    },
    itemName : req.body.itemName,
    itemStock : req.body.itemStock,
    price : req.body.price,
    size : req.body.size,
    color : req.body.color,
    type : req.body.type,
    shopName : req.body.shopName,
  
  
    });
    item.save()
    .then(() => {
      res.json("Item details added");
    })
    .catch((err) => {
      console.error("Error adding Item details:", err);
      res.status(500).json({ error: "Server error" });
    });
  
   })

   //Read function 
   router.route("/").get(async (req, res) => {
       try {
         const items = await Baylee.find(); // Exclude the image field
     
         // Check if there are any items in the database
         if (!items || items.length === 0) {
           return res.status(404).json({ error: "No Shop found" });
         }
     
         // Send the entire array of Items in the response
         res.json(items);
       } catch (error) {
         console.error("Error fetching Shop details:", error);
         res.status(500).json({ error: "Server error" });
       }
     });
   
   // Fetching a Shop using name
   router.route("/get/:itemName").get(async (req, res) => {
       let name = req.params.itemName;
   
       // Use a case-insensitive regular expression for the search
       const caseInsensitiveRegex = new RegExp('^' + name + '$', 'i');
   
       try {
           const item = await Baylee.findOne({ itemName: caseInsensitiveRegex });
           res.json(item); // Success
       } catch (err) {
           console.log(err);
           res.status(500).json({ error: "Internal Server Error" }); // Handle the error and send a response
       }
   });
   
   
   //fetching using store Id 
   router.route("/getItem/:itemId").get(async(req,res)=>{
       let itemId=req.params.itemId;
      const item= await Baylee.findOne({ itemId: itemId }).then((item)=>{
           res.json(item) //success
       }).catch((err)=>{ //unsuccess
     
           console.log(err);
     
       })     
     
     }) 
   
    //   //Delete function
   
    // router.route("/delete/:itemId").delete(async (req, res) => {
    //    try {
    //      let itemId = req.params.itemId;
    //      const deletedItem = await Baylee.findOneAndDelete({ itemId: itemId });
     
    //      if (deletedItem) {
    //        res.json("Item details deleted");
    //      } else {
    //        res.status(404).json({ message: `Product ${itemId} does not exist` });
    //      }
    //    } catch (err) {
    //      console.error(err);
    //      res.status(500).json({ message: "An error occurred while deleting the Item" });
    //    }
    //  });
   
    //  //update 
    //  router.route("/update/:itemId").put(upload.single("image"), async (req, res) => {
    //      try {
    //          const itemId = req.params.itemId;
    //          const {
    //              itemName,
    //              price,
    //              itemStock,
    //              type,
    //              size,
    //              color,
    //          } = req.body;
     
    //          const existingItem = await Baylee.findOne({ itemId });
     
    //          if (!existingItem) {
    //              return res.status(404).json({ error: "Item details not found" });
    //          }
     
    //          if (existingItem.image) {
    //              const imagePath = `uploads/${existingItem.image.filename}`;
    //              if (fs.existsSync(imagePath)) {
    //                  fs.unlinkSync(imagePath);
    //              }
    //          }
     
    //          const image = {
    //              data: fs.readFileSync(`uploads/${req.file.filename}`),
    //              contentType: "image/png"
    //          };
     
    //          const updatedDate = formatTimeDifference(new Date());
     
    //          const updateItem = {
    //              itemName,
    //              price,
    //              itemStock,
    //              updatedDate,
    //              type,
    //              size,
    //              color,
    //              image,
    //          };
     
    //          await Baylee.findOneAndUpdate({ itemId }, updateItem);
     
    //          res.json("Item details Updated");
    //      } catch (error) {
    //          console.error("Error updating Item details:", error);
    //          res.status(500).json({ error: "Server error" });
    //      }
    //  });
     
    //  function formatTimeDifference(date) {
    //      const now = moment();
    //      const updatedDate = moment(date);
     
    //      const diffInMinutes = now.diff(updatedDate, 'minutes');
    //      const diffInHours = now.diff(updatedDate, 'hours');
    //      const diffInDays = now.diff(updatedDate, 'days');
     
    //      if (diffInMinutes < 60) {
    //          return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    //      } else if (diffInHours < 24) {
    //          return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    //      } else {
    //          return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    //      }
    //  }
     


module.exports = router;