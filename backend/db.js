const mongoose = require("mongoose");

const url = "mongodb+srv://layamyadam:CmRweR94mfUZOtpl@ebanking.rhengu3.mongodb.net/";

module.exports = () => {
  try {
    mongoose.connect(url, () => {
        console.log("successfully connected to mongoDB");
      });
  } catch (error) {
    console.log(" could not connect to mongoDB",error);
  }
};