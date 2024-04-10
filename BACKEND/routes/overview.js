const router = require("express").Router();
let OverView =require("../models/OverView");

//Create Function 
router.route("/addOverView").post((req,res)=> {
    const orderId = req.body.orderId;
    const description  = req.body.description;
    const date = req.body.date;

    const newOverView = new OverView({
        orderId,
        description,
        date,
    })

    newOverView.save().then(()=>{  //then() is a js promise
       res.json("Notification added") //success
    }).catch((err)=>{ //unsuccess

        console.log(err);

    })     

})

//Read Function

router.route("/").get((req,res)=>{
    OverView.find().then((overview)=>{
        res.json(overview) //success
    }).catch((err)=>{ //unsuccess

        console.log(err);

    })     

})

// Schedule a task to delete expired OverView entries every 30 seconds
setInterval(async () => {
    const thirtySecondsAgo = new Date(Date.now() - 30 * 1000); // Get the date/time 30 seconds ago
    try {
        await OverView.deleteMany({ date: { $lt: thirtySecondsAgo } });
    } catch (error) {
        console.error('Error deleting expired OverView entries:', error);
    }
}, 24 * 60 * 60 * 1000); //24 hrs

module.exports = router;