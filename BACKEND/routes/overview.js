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
// Delete all after 24 hours
setTimeout(async () => {
    try {
        await OverView.deleteMany({});
        console.log('All OverView entries deleted after 24 hours.');
    } catch (error) {
        console.error('Error deleting all OverView entries:', error);
    }
}, 24 * 60 * 60 * 1000); // 24 hours in milliseconds


module.exports = router;