const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const Counter = require("./Counter"); 
const contactSchema = new Schema({

    issueId :{
        type : String,
        unique: true,

    },

    name : {
        type : String,
        required : true //checking whether name is null ,if so we cant login
    },

    email :{
        type : String,
        required : true 
    
    },
    message :{
        type : String,
        required : true 
    
    },
    date :{
        type : String,
        default: function() {
            // Automatically generate the requestedDate using the current date
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
            const day = currentDate.getDate().toString().padStart(2, "0");
            return `${year}-${month}-${day}`;
          }
    
    },

    status :{
      type : String,
      default:"Pending"
  
  },

  lastUpdatedtime :{
    type : String,
   

},

})

// Create middleware to auto-generate the issueId
contactSchema.pre("save", async function (next) {
    if (!this.issueId) {
      // Find the counter document and increment the count
      const counter = await Counter.findOneAndUpdate(
        { name: "issueIdCounter" },
        { $inc: { count: 1 } },
        { upsert: true, new: true }
      );
  
      // Use the incremented count to generate the issueId
      this.issueId = `Issue${counter.count.toString().padStart(2, "0")}`;
    }
    next();
  });

const Contact = mongoose.model("Contact",contactSchema);
module.exports = Contact; 