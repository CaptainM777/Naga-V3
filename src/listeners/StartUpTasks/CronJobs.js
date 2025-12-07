const { Listener } = require('@sapphire/framework');

class CronJobs extends Listener {
  constructor(context, options) {
    super(context, {
      ...options, 
      once: true,
      event: 'clientReady'
    });
  }

  run() { // this is supposed to create the cron jobs, add in code in the future
    this.container.client.emit('startupTaskCompleted', 'cronJobs');
  }
}

module.exports = { CronJobs };