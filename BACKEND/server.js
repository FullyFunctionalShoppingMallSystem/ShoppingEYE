const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 8070;
 app.use(cors());
 app.use(bodyParser.json());

 const URL= process.env.MONGODB_URL;

 mongoose.connect(URL, {
   // useCreateIndex: true,
   // useNewUrlParser: true,
   //useUnifiedTopology: true,     
   // useFindAndModify: false
 });

 const connection = mongoose.connection;
 connection.once("open", () => {
console.log("Mongodb Connection success!");
 });

//sammani
 const storeRouter = require("./routes/stores.js");
 app.use("/store",storeRouter);

 const shopRouter = require("./routes/shops.js");
 app.use("/shop",shopRouter);

 const contactRouter = require("./routes/contacts.js");
 app.use("/contact",contactRouter);

 const adsRouter = require("./routes/ads.js");
 app.use("/advertisment",adsRouter);

 const bayleeRouter = require("./routes/baylee.js");
 app.use("/baylee",bayleeRouter);

 const cartRouter = require("./routes/cart.js");
 app.use("/cart",cartRouter);

 const reviewRouter = require("./routes/review.js");
 app.use("/review",reviewRouter);

 const orderRouter = require("./routes/order.js");
 app.use("/order",orderRouter);

 const peopleRouter = require("./routes/Users.js");
app.use("/users", peopleRouter);

const overviewRouter = require("./routes/overview.js");
app.use("/overview", overviewRouter);

const codeRouter = require("./routes/sales.js");
app.use("/code", codeRouter);

const tshirtRouter = require("./routes/tshirt.js");
app.use("/Tee", tshirtRouter);


//sandaru
//create loyalty
const createLoyaltyRouter = require("./routes/CreateLoyaltyRoutes");
app.use("/createLoyalty",createLoyaltyRouter);

//show loyalty membership to admin
const loyaltyMembershipRouter = require("./routes/LoyaltyAdminWatchRoutes");
app.use("/loyaltyAdminWatch",loyaltyMembershipRouter);

//Add approved loyalty memberships 
const approvedmembershipRouter = require("./routes/ApproveMembersRoutes");
app.use("/approvedMemberships", approvedmembershipRouter);


//sandali
const paymentRouter = require("./routes/payments.js");

app.use("/payment", paymentRouter);



//ravindu
//person router
const personRoutes = require('./routes/person.js');
app.use('/person', personRoutes);

//photo router
const socialPRoutes = require('./routes/socialP.js');
app.use('/socialP', socialPRoutes);




 app.listen(PORT, () => {
    console.log(`Server is up and running on port number : ${PORT}`);
 });
 