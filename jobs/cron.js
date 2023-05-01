
const schedule = require('node-schedule');
const { checkWebsites } = require('./websiteJob');

const job = schedule.scheduleJob('* * * * *', () => {
    checkWebsites();
  });

  

module.exports = job;
