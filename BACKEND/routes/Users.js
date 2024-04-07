const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Route to get all users from the "people" collection
router.get("/", async (req, res) => {
  try {
    const peopleCollection = mongoose.connection.db.collection("people");
    const users = await peopleCollection.find({}).toArray();
    res.json(users); // Send the users as JSON response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;