const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected!");
  } catch (err) {
    console.log("Connection Err:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
