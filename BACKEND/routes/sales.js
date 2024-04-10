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

  // Fetch a code by code value
router.route("/:code").get(async (req, res) => {
  try {
      const codeValue = req.params.code;
      const code = await Sales.findOne({ code: codeValue });
      
      if (code) {
          res.json(code); // Return the code if found
      } else {
          res.status(404).json({ message: "Code not found" });
      }
  } catch (error) {
      console.error("Error fetching code by code value:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;