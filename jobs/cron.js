//const cron = require('node-cron');
const schedule = require('node-schedule');
const { checkWebsites } = require('./websiteJob');

// const job = cron.schedule('* * * * *', () => {
//   checkWebsites();
// });

// Schedule the job to run at 9:30 am daily
const job = schedule.scheduleJob('30 9 * * *', () => {
    checkWebsites();
  });
  

module.exports = job;
