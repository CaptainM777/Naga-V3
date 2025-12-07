const { Listener } = require('@sapphire/framework');

class CreateServerConfigDocs extends Listener {
  constructor(context, options) {
    super(context, {
      ...options, 
      once: true,
      event: 'modelsCreated'
    });
  }

  run() {
    const serverModel = this.container.models.get('Server');
    const guilds = this.container.client.guilds.cache;

    guilds.forEach(async (guild) => {
      const server = await serverModel.findById(guild.id);
      if (!server) { 
        serverModel.create({ _id: guild.id });
        this.container.logger.info(`Created server_config document for ${guild.id} (${guild.name})`);
      }
    });

    this.container.client.emit('startupTaskCompleted', 'createServerConfigDocs');
  }
}

module.exports = { CreateServerConfigDocs };