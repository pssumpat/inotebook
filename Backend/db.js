const mongoose = require("mongoose");

// Replace 'your-mongodb-uri' with the actual connection URI of your MongoDB database.
const mongoURI = 'mongodb://127.0.0.1:27017/iNotebook';

connectToMongoose = () => {

  // Connect to MongoDB
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Get the default connection
  const db = mongoose.connection;

  // Event handlers for the Mongoose connection
  db.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  db.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });

  db.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  });
};

// Gracefully close the Mongoose connection when the Node.js application is terminated
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed through app termination");
    process.exit(0);
  });
});

module.exports = connectToMongoose;