const {checkWebsites} = require('../../../jobs/websiteJob')

export default async function cron (req, res) {
    try {
      await checkWebsites();
      res.status(200).json({ message: 'Cron job executed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error executing cron job' });
    }
  }

