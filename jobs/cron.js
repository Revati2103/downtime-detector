const cron = require('node-cron');
const { checkWebsites } = require('./websiteJob');

cron.schedule('* * * * *', () => {
  checkWebsites();
});

module.exports = cron;
