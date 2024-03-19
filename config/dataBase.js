require('dotenv').config(); 
const mongoose = require("mongoose");
const dbConnect = () => {
  const dbURI = process.env.MONGODB_URI; 
  mongoose.connect(dbURI)
    .then(() => {
      console.log("DB Connection successful");
    })
    .catch((error) => {
      console.log(" DB Got error");
      console.error(error.message);
      process.exit(1);
    });
};

module.exports = dbConnect;

