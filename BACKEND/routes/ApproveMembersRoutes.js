const express = require('express');
const router = express.Router();
const CreateMem = require('../models/ApproveMemberModels')


router.post('/addMem', async (req, res) => {
    try {
      const Createmem = new CreateMem(req.body);
      await Createmem.save();
      res.status(201).json(Createmem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.get('/AMdis', async (req, res) => {
    try {
      const Createmem = await CreateMem.find();
      res.json(Createmem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  


  module.exports = router;