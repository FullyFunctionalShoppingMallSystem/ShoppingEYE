const router = require("express").Router();
let Payment = require("../models/payment");

router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const cardnumber = req.body.cardnumber;
    const cvv= req.body.cvv;
    const expdate = req.body.expdate;

    const newPayment = new Payment({
        name,
        cardnumber,
        cvv,
        expdate
    })

    newPayment.save().then(()=>{
        res.json("Payment added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    Payment.find().then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {name,cardnumber,cvv,expdate} = req.body;

    const updatePayment = {
        name,
        cardnumber,
        cvv,
        expdate
    }

    const update = await Payment.findByIdAndUpdate(userId, updatePayment)
    .then(()=>{
        res.status(200).send({status: "User updated", user:update})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Payment.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status: "User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data", error:err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let userId=req.params.id;
    await Payment.findById(userId)
    .then((user)=>{
        res.status(200).send({status: "User fetched", user: user})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with getting user", error: err.message});
    })
})

module.exports = router;
