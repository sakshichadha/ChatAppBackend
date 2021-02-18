const express = require('express');
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const app = express();
dotenv.config();

// Connect Database
connectDB();
// Init middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => {
  
  res.send('server working');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));