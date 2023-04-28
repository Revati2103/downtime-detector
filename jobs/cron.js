const cron = require('node-cron');
const { checkWebsites } = require('./websiteJob');

const job = cron.schedule('* * * * *', () => {
  checkWebsites();
});

module.exports = job;
