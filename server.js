const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5500;
const { createWebsite, checkWebsites } = require('./controllers/websiteController');
const { snoozeUrl } = require('./controllers/snoozeController')
const dotenv = require('dotenv');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'client/out')));

// Set up routes
app.post('/api/websites', createWebsite);

app.put('/api/snooze/:id', snoozeUrl);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

// Run cron job once everyday.
cron.schedule('0 0 * * *', () => {
  checkWebsites();
});

// cron.schedule('* * * * *', () => {
//   checkWebsites();
// })

app.get('/', (req,res) => {
    res.send('Hello from 5500!');
})

app.listen(port, () => console.log(`Server started on port ${port}`))