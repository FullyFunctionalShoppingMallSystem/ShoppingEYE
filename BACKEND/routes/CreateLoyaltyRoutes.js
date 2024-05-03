const express = require('express');
const router = express.Router();
const CreateLyl = require('../models/CreateLoyaltyModels')



router.post('/addLoyl', async (req, res) => {
    try {
      const Createlyl = new CreateLyl(req.body);
      await Createlyl.save();
      res.status(201).json(Createlyl);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


router.delete('/delete/:nic', async (req, res) => {
  try {
    // Find the loyalty membership by NIC and delete it
    const deletedLoyalty = await CreateLoyalty.findOneAndDelete({ nic: req.params.nic });
    if (!deletedLoyalty) {
      // If the loyalty membership with the provided NIC is not found, return a 404 error
      return res.status(404).json({ error: "Loyalty membership not found" });
    }
    // If deletion is successful, return a success message
    res.status(200).json({ status: "Loyalty membership deleted successfully" });
  } catch (err) {
    // If an error occurs during the deletion process, return a 500 error with the error message
    res.status(500).json({ error: "Error deleting loyalty membership", details: err.message });
  }
});


router.get('/loyldis', async (req, res) => {
    try {
      const Createlyl = await CreateLyl.find();
      res.json(Createlyl);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  //Read by email
router.route("/getEmail/:email").get(async(req,res)=>{
  let email=req.params.email;
 const contact= await CreateLyl.findOne({ email: email }).then((contact)=>{
      res.json(contact) //success
  }).catch((err)=>{ //unsuccess

      console.log(err);

  })     

}) 


  
  
  module.exports = router; // Export the router