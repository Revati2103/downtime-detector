const CronJob = require('cron').CronJob;
const { checkWebsites } = require('./websiteJob');

const job = new CronJob('* * * * * *', checkWebsites, null, true, 'America/Los_Angeles');

module.exports = job;
