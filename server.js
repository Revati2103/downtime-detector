const express = require('express');
//const cron = require('node-cron');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5500;
//const { checkWebsites } = require('./jobs/websiteJob');
const dotenv = require('dotenv');
require('dotenv').config();


const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())


// handle preflight requests
app.options('*', cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'client/out')));


//app.put('/api/snooze/:id', snoozeUrl);

// Import routes
const twilioRoutes = require('./routes/twilioRoutes');
const snoozeRoutes = require('./routes/snoozeRoutes')


// Use routes
app.use('/api/twilio', twilioRoutes);
app.use('/api/snooze', snoozeRoutes);






// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});


// Require the cron job
require('./jobs/cron');

// Run cron job once everyday.
// cron.schedule('0 0 * * *', () => {
//   checkWebsites();
// });


// cron.schedule('* * * * *', () => {
//   checkWebsites();
// })

app.get('/', (req,res) => {
    res.send('Hello from 5500!');
})

app.listen(port, () => console.log(`Server started on port ${port}`))