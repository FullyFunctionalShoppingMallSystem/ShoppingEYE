const router = require("express").Router();
let Contact =require("../models/Contact");


//Create Function 
router.route("/addIssue").post((req,res)=> {

    const issueId = req.body.issueId;
    const name  = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const date = req.body.date;
    const status = req.body.status;

    const newIssue = new Contact({
        issueId,
        name,
        email,
        message,
        date,
        status
    })

    newIssue.save().then(()=>{  //then() is a js promise
       res.json("Issue details added") //success
    }).catch((err)=>{ //unsuccess

        console.log(err);

    })     

})

//Read Function

router.route("/").get((req,res)=>{
    Contact.find().then((contact)=>{
        res.json(contact) //success
    }).catch((err)=>{ //unsuccess

        console.log(err);

    })     

})

//Read by Id 
router.route("/getIssue/:issueId").get(async(req,res)=>{
    let issueId=req.params.issueId;
   const contact= await Contact.findOne({ issueId: issueId }).then((contact)=>{
        res.json(contact) //success
    }).catch((err)=>{ //unsuccess
  
        console.log(err);
  
    })     
  
  }) 


 //Delete function

 router.route("/delete/:issueId").delete(async(req,res)=>{
    let issueId = req.params.issueId;
    await Contact.findOneAndDelete({ issueId: issueId }).then(()=>{
        res.json("Issue details Deleted") //success
    }).catch((err)=>{ //unsuccess

        console.log(err);
 
    })     
  })


  //Update function

  router.route("/update/:issueId").put(async(req, res) => {
    let issueId = req.params.issueId;
    const status = req.body.status;
    
    // Get the current timestamp
    const currentTime = new Date();
    
    // Format date and time
    const formattedDateTime = currentTime.toLocaleString(); // Adjust formatting as per requirement
    
    const updateStatus = {
        status,
        lastUpdatedtime: formattedDateTime // Add lastUpdatedDateTime to the update object
    };

    const update = await Contact.findOneAndUpdate({ issueId: issueId }, updateStatus).then(() => {
        res.json("Issue status updated"); //success
    }).catch((err) => { //unsuccess
        console.log(err);
        // Handle error response
        res.status(500).json({ error: "Failed to update issue status" });
    });
});

module.exports = router;