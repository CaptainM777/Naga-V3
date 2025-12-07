const { Listener } = require('@sapphire/framework');

class LoadDevelopers extends Listener {
  constructor(context, options) {
      super(context, { 
        ...options, 
        once: true,
        event: 'applicationCommandRegistriesRegistered' 
      });
  }

  run() {
    this.container.developers = process.env.DEVELOPERS.split(',').map(dev => dev.trim());

    this.container.client.emit('startupTaskCompleted', 'loadDevelopers');
  }
}

module.exports = { LoadDevelopers }
