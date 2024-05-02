const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongodb connection success!');
});

const paymentRouter = require("./routes/payments.js");

app.use("/payment", paymentRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number : ${PORT}`);
});
