const router = require("express").Router();
let Store =require("../models/Store");

//Create Function 
router.route("/addStore").post((req,res)=> {

    const storeID  = req.body.storeID;
    const size = req.body.size;
    const location = req.body.location;
    const maxHours = req.body.maxHours;
    const minRentalFee = req.body.minRentalFee;

    const newStore = new Store({
        storeID,
        size,
        location,
        maxHours,
        minRentalFee
    })

    newStore.save().then(()=>{  //then() is a js promise
       res.json("Store details added") //success
    }).catch((err)=>{ //unsuccess

        console.log(err);

    })     

})

module.exports = router;