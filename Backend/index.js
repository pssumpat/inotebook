// Import required modules
const connectToMongoose = require("./db");
const express = require('express');
const cors = require('cors')

// Connect to MongoDB using 'connectToMongoose' function
connectToMongoose();

// Create an Express app
const app = express();

app.use(cors())
const port = 5000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());

// Define other routes as needed
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
