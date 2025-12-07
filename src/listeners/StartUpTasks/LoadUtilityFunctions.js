const { Listener } = require('@sapphire/framework');

class LoadUtlityFunctions extends Listener {
  constructor(context, options) {
    super(context, {
      ...options, 
      once: true,
      event: 'applicationCommandRegistriesRegistered'
    });
  }

  run() {
    this.container.logger.info('Loading all utility functions...')

    const utils = require('../../lib/utils/UtilityFunctions');
    this.container.utils = utils;

    this.container.logger.info('+ Loaded all utility functions');

    this.container.client.emit('startupTaskCompleted', 'loadUtilityFunctions');
  }
}

module.exports = { LoadUtlityFunctions };