const router = require("express").Router();
let Cart =require("../models/Cart");
const multer = require("multer");
const fs = require('fs');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/addItem', upload.single('image'), (req, res) => {
  console.log(req.file);
  const newItem = new Cart({
    itemId: req.body.itemId,
    image: {
      data: fs.readFileSync('uploads/' + req.file.filename),
      contentType: "image/png"
    },
    itemName: req.body.itemName,
    price: req.body.price,
    quantity: req.body.quantity,
    shopName: req.body.shopName,
    type: req.body.type,
    size: req.body.size,
    date:req.body.date
  });

  newItem.save()
    .then(() => {
      res.json("Item added to the Cart");
    })
    .catch((err) => {
      console.error("Error adding item to the Cart:", err);
      res.status(500).json({ error: "Server error" });
    });
});

router.get('/items', async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items); // Sending all items with details to the frontend
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Server error" });
  }
});


   //Read function 
   router.route("/").get(async (req, res) => {
       try {
         const items = await Cart.find(); // Exclude the image field
     
         // Check if there are any items in the database
         if (!items || items.length === 0) {
           return res.status(404).json({ error: "No Items found" });
         }
     
         // Send the entire array of Items in the response
         res.json(items);
       } catch (error) {
         console.error("Error fetching Items :", error);
         res.status(500).json({ error: "Server error" });
       }
     });
   
   // Fetching a Shop using name
   router.route("/get/:itemName").get(async (req, res) => {
       let name = req.params.itemName;
   
       // Use a case-insensitive regular expression for the search
       const caseInsensitiveRegex = new RegExp('^' + name + '$', 'i');
   
       try {
           const item = await Cart.findOne({ itemName: caseInsensitiveRegex });
           res.json(item); // Success
       } catch (err) {
           console.log(err);
           res.status(500).json({ error: "Internal Server Error" }); // Handle the error and send a response
       }
   });
   
   
   //fetching using store Id 
   router.route("/getItem/:itemId").get(async(req,res)=>{
       let itemId=req.params.itemId;
      const item= await Cart.findOne({ itemId: itemId }).then((item)=>{
           res.json(item) //success
       }).catch((err)=>{ //unsuccess
     
           console.log(err);
     
       })     
     
     }) 
   
     //Delete function
router.route("/delete/:itemId").delete(async (req, res) => {
  try {
    let itemId = req.params.itemId;
    const deletedItem = await Cart.findOneAndDelete({ _id: itemId }); // Use _id instead of itemId
    
    if (deletedItem) {
      res.json("Item deleted");
    } else {
      res.status(404).json({ message: `Product ${itemId} does not exist` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while deleting the Item" });
  }
});

     //update 
     router.route("/update/:itemId").put(upload.single("image"), async (req, res) => {
        try {
            const itemId = req.params.itemId;
            const { quantity } = req.body;
    
            const existingItem = await Cart.findOne({ itemId });
    
            if (!existingItem) {
                return res.status(404).json({ error: "Item details not found" });
            }
    
            // If you want to update only the quantity, you don't need to handle the image
            const updateItem = {
                quantity,
            };
    
            await Cart.findOneAndUpdate({ itemId }, updateItem);
    
            res.json("Quantity Updated");
        } catch (error) {
            console.error("Error updating Quantity:", error);
            res.status(500).json({ error: "Server error" });
        }
    });
     
    
    // DELETE route to delete all items from the cart
router.delete("/deleteAll", async (req, res) => {
  try {
    // Logic to delete all items from the cart in your database
    await Cart.deleteMany();

    res.status(200).json({ message: "All items deleted from the cart successfully." });
  } catch (error) {
    console.error("Error deleting items from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;