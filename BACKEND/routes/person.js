// routes/person.js
const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const bcrypt = require('bcryptjs');
const multer = require('multer');


// POST /register route without photo upload functionality
router.post('/register', async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await Person.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new person without a photo
    const person = new Person({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword, // Use the hashed password
      dateOfBirth: req.body.dateOfBirth,
    });

    // Save the new person to the database
    await person.save();

    // Send a success response
    res.status(201).send('Person registered successfully');
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).send({ error: 'Failed to register. Please try again.' });
  }
});


// Read all persons
router.get('/personlist', async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






// PUT endpoint for updating a person's details
router.put('/:id', async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body, // The updated details from the request body
      { new: true } // Option to return the updated document
    );
    
    if (!updatedPerson) {
      return res.status(404).send('Person not found');
    }

    res.json(updatedPerson);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Assuming you're using Express and your Person model
router.delete('/deleteByEmail/:email', async (req, res) => {
  try {
    const email = req.params.email;
    await Person.findOneAndDelete({ email: email });
    res.sendStatus(204); // 204 No Content indicates a successful deletion
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


//search
router.get('/search', async (req, res) => {
  try {
    const {query}=req.query;
    const results=await Person.find({$text:{$search:query}});
    res.json(results);
  } catch (error){
    res.status(500).json({ error: err.message });
  }
});


// Read one person by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the URL parameters
    const person = await Person.findById(userId);

    if (!person) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(person);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Read one person by nationalID
router.get('/nationalId/:nationalId', async (req, res) => {
  try {
    const nationalId = req.params.nationalId;
    const person = await Person.findOne({ nationalId });

    if (!person) {
      res.status(404).json({ error: 'Person not found' });
    } else {
      res.json(person);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Route to handle login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the person by email
    const person = await Person.findOne({ email });
    if (!person) {
      return res.status(404).json({ error: 'No user found with this email' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, person.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Login successful, return success response (Consider using sessions or JWT for actual authentication)
    res.status(200).json({ message: 'Login successful', person });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});


// Update user details by email
router.put('/updateByEmail/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const updates = req.body;

    const person = await Person.findOneAndUpdate({ email: email }, updates, { new: true });
    if (!person) {
      return res.status(404).send({ message: "No user found with the provided email." });
    }
    res.status(200).json(person);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error occurred while updating the user." });
  }
});



module.exports = router;
