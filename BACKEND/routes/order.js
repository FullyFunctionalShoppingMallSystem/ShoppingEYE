const router = require("express").Router();
let Order =require("../models/Order");



//Create function
router.route("/addOrder").post((req, res) => {
    const { orderId, deliveryFee, Code, status, date,email, details,total,subTotal,discount } = req.body;

   

    // Ensure details array is defined before attempting to map over it
    const orderDetails = details ? details.map(item => ({
        itemName: item.itemName,
        type: item.type,
        price: item.price,
        shopName: item.shopName,
        itemId: item.itemId,
        quantity: item.quantity,
        date:item.date,
        size:item.size
    })) : [];

    const newOrder = new Order({
        orderId,
        details: orderDetails,
        deliveryFee,
        Code,
        status,
        date,
        email,
        total,
        subTotal,
        discount
    });

    newOrder.save()
        .then(() => {
            res.json("Order details added successfully");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json("Error adding order details");
        });
});



//Read Function

router.route("/").get((req,res)=>{
    Order.find().then((order)=>{
        res.json(order) //success
    }).catch((err)=>{ //unsuccess

        console.log(err);

    })     

})

// Route to fetch order details by orderId
router.route("/getOrder/:orderId").get(async(req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findOne({ orderId: orderId });
        res.json(order);
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ error: "Error fetching order details" });
    }
});



 //Delete function

 router.route("/delete/:orderId").delete(async(req,res)=>{
    let orderId = req.params.orderId;
    await Order.findOneAndDelete({ orderId: orderId }).then(()=>{
        res.json("Order details Deleted") //success
    }).catch((err)=>{ //unsuccess

        console.log(err);
 
    })     
  })


  //Update function

router.route("/update/:orderId").put(async(req,res)=>{
    let orderId= req.params.orderId;
    const status = req.body.status; 


    const updateStatus ={ 
        
        status
     
   
       }
    const update = await Order.findOneAndUpdate({ orderId: orderId },updateStatus).then(()=>{
        res.json("Order status updated") //success
    }).catch((err)=>{ //unsuccess

        console.log(err);

    })     
 
}) 






module.exports = router;


