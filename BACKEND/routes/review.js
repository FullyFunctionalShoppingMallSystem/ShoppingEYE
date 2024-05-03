const router = require("express").Router();
let Review =require("../models/Review");
const fs = require('fs');

//create
router.route("/addReview").post((req, res) => {
  const content = req.body.content;
  const rating = Number(req.body.rating);
  const userId = req.body.userId;
  const itemId = req.body.itemId;
  const date = req.body.date;


  const newReview = new Review({
      content,
      rating,
      userId,
      itemId,
      date
  });

  newReview.save()
      .then(() => {
          res.json("Review added");
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Server error" });
      });
});

// Read function 
router.route("/").get(async (req, res) => {
    try {
      const review = await Review.find(); // Exclude the image field
  
      // Check if there are any review in the database
      if (!review || review.length === 0) {
        return res.status(404).json({ error: "No reviews found" });
      }
  
      // Send the entire array of review in the response
      res.json(review);
    } catch (error) {
      console.error("Error fetching reviews :", error);
      res.status(500).json({ error: "Server error" });
    }
  });


// Fetching using id
router.route("/getReview/:id").get(async (req, res) => {
  try {
      const reviewId = req.params.id;
      const review = await Review.findById(reviewId);
      if (!review) {
          return res.status(404).json({ error: "Review not found" });
      }
      res.json(review);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



   //Delete function

 router.route("/delete/:id").delete(async (req, res) => {
    try {
      let review = req.params.id;
      const deletedReview = await Review.findByIdAndDelete({ _id: review });
  
      if (deletedReview) {
        res.json("Review deleted");
      } else {
        res.status(404).json({ message: ` Review does not exist` });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while deleting the review" });
    }
  });


  // Update function
router.route("/update/:id").put(async (req, res) => {
    try {
        const reviewId = req.params.id;
        const { content, rating } = req.body;

        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { content, rating },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.json(updatedReview);
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).json({ error: "Server error" });
    }
});

  

module.exports = router;