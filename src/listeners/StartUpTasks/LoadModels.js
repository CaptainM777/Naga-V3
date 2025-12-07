const fs = require('node:fs');
const path = require('node:path');

const { Listener } = require('@sapphire/framework');
const { Collection } = require('discord.js');

class LoadModels extends Listener {
  constructor(context, options) {
    super(context, {
      ...options, 
      once: true,
      event: 'applicationCommandRegistriesRegistered'
    });
  }

  run() {
    this.container.models = new Collection();

    this.container.logger.info('Loading all models...');

    const modelsPath = path.join(__dirname, '..', '..', 'models');
    const modelFiles = fs.readdirSync(modelsPath).filter(file => file.endsWith('.js'));

    for (const file of modelFiles) {
      const modelFilePath = path.join(modelsPath, file);
      const model = require(modelFilePath);
      const modelFileName = path.basename(file, path.extname(file));

      this.container.models.set(modelFileName, model);
      this.container.logger.info(`+ Loaded model ${modelFileName}`);
    }

    this.container.client.emit('modelsCreated');
    this.container.client.emit('startupTaskCompleted', 'loadModels');
  }
}

module.exports = { LoadModels };