const express = require('express');
const router = express.Router();
const CreateLyl = require('../models/CreateLoyaltyModels')



  
  //update loyalty membership
  router.put('/update/:nic', async (req, res) => {
    try {
      const loyaltymembers = await LoyaltyMembers.findByIdAndUpdate(req.params.nic, req.body, { new: true });
      if (!loyaltymembers) {
        return res.status(404).json({ error: "Leave request not found" });
      }
      res.status(200).json(loyaltymembers);
    } catch (err) {
      res.status(500).json({ error: "Error with updating leave request data" });
    }
  });
  
// Route to handle deletion of loyalty memberships
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

// Export the router
module.exports = router;
  
  module.exports = router; // Export the router