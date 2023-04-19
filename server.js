const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5500;
const { createWebsite, checkWebsites } = require('./controllers/websiteController');
const dotenv = require('dotenv');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Set up routes
app.post('/api/websites', createWebsite);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

// Run cron job every 5 minutes
cron.schedule('*/5 * * * *', () => {
  checkWebsites();
});

app.get('/', (req,res) => {
    res.send('Hello from 5500!');
})

app.listen(port, () => console.log(`Server started on port ${port}`))