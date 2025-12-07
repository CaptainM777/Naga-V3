const { Listener } = require('@sapphire/framework');

class SetPresence extends Listener {
  constructor(context, options) {
    super(context, {
      ...options, 
      once: true,
      event: 'applicationCommandRegistriesRegistered'
    });
  }

  run() {
    this.container.client.user.setPresence({ activities: [{ name: 'Naga | n.help', type: 0 }] });
    
    this.container.client.emit('startupTaskCompleted', 'setPresence');
  }
}

module.exports = { SetPresence };