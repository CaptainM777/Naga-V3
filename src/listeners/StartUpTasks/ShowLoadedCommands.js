const { Listener } = require('@sapphire/framework');

class ShowLoadedCommands extends Listener {
  constructor(context, options) {
    super(context, {
      ...options, 
      once: true,
      event: 'applicationCommandRegistriesRegistered'
    });
  }

  run() {
    const commandNames = this.container.stores.get('commands').keys();

    if (commandNames.length != 0) {
      this.container.logger.info('Loading commands...');

      for (const commandName of commandNames) {
        this.container.logger.info(`+ Loaded ${commandName}`);
      }
    }

    this.container.client.emit('startupTaskCompleted', 'showLoadedCommands');
  }
}

module.exports = { ShowLoadedCommands };