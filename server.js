const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5500
const websiteRoutes = require('./routes/websiteRoutes');
const dotenv = require("dotenv");
require("dotenv").config();

const connectDB = require('./config/db')
connectDB()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Set up routes
app.use('/api/websites', websiteRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});


app.get('/', (req,res) => {
    res.send('Hello from 5500!');
})

app.listen(port, () => console.log(`Server started on port ${port}`))