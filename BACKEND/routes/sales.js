const router = require("express").Router();
let Sales =require("../models/Sales");

//Create Function 
router.route("/addCode").post((req,res)=> {
    const code = req.body.code;
    const description  = req.body.description;
    const date = req.body.date;
    const expDate = req.body.expDate;
    const discount = req.body.discount;


    const newCode = new Sales({
        code,
        description,
        date,
        expDate,
        discount
    })

    newCode.save().then(()=>{  //then() is a js promise
       res.json("Notification added") //success
    }).catch((err)=>{ //unsuccess

        console.log(err);

    })     

})

//Read Function

router.route("/").get((req,res)=>{
    Sales.find().then((sales)=>{
        res.json(sales) //success
    }).catch((err)=>{ //unsuccess

        console.log(err);

    })     

})

//Delete function

router.route("/delete/:id").delete(async (req, res) => {
    try {
      let sales = req.params.id;
      const deletedCode = await Review.findByIdAndDelete({ _id: sales });
  
      if (deletedCode) {
        res.json("Code deleted");
      } else {
        res.status(404).json({ message: ` Promo Code does not exist` });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while deleting the Promo Code" });
    }
  });


module.exports = router;