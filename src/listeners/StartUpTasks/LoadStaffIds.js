const { Listener } = require('@sapphire/framework');
const { Collection } = require('discord.js')

class LoadStaffIds extends Listener {
  constructor(context, options) {
    super(context, {
      ...options, 
      once: true,
      event: 'applicationCommandRegistriesRegistered'
    });
  }

  run() {
    this.container.staff = new Collection();

    this.container.logger.info('Loading all staff role ID\'s...');

    this.container.staff.set('Sentry', process.env.SENTRY_ID || '1182448979288527029');
    this.container.logger.info('+ Loaded Sentry');

    this.container.staff.set('Dai Li', process.env.DAI_LI_ID || '1182449762583191592');
    this.container.logger.info('+ Loaded Dai Li');

    this.container.staff.set('Mover Star', process.env.MOVER_STAR_ID || '1224072458206711928');
    this.container.logger.info('+ Loaded Mover Star');

    this.container.client.emit('startupTaskCompleted', 'loadStaffIds');
  }
}

module.exports = { LoadStaffIds };