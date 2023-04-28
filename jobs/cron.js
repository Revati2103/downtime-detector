//const cron = require('node-cron');
const schedule = require('node-schedule');
const { checkWebsites } = require('./websiteJob');

// const job = cron.schedule('* * * * *', () => {
//   checkWebsites();
// });

// Schedule the job to run every minute
const job = schedule.scheduleJob('* * * * *', () => {
    checkWebsites();
  });
  

module.exports = job;
