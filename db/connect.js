const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://host:host@cluster0.menmk.mongodb.net/bonk?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("DB_CONNECTION_SUCCESSFULL");
  } catch (error) {
    console.log("DB_CONNECTION_FAILED");
    process.exit(1);
  }
};

module.exports = { connectDB };
