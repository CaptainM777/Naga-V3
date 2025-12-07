const { Listener } = require('@sapphire/framework');

class ShowLoadedInteractionHandlers extends Listener {
  constructor(context, options) {
    super(context, {
      ...options, 
      once: true,
      event: 'applicationCommandRegistriesRegistered'
    });
  }

  run() { // add code once interaction handlers are created
    this.container.client.emit('startupTaskCompleted', 'showLoadedInteractionHandlers');
  }
}

module.exports = { ShowLoadedInteractionHandlers };