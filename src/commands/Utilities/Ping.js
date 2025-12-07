const { isMessageInstance } = require('@sapphire/discord.js-utilities');
const { Command } = require('@sapphire/framework');

class Ping extends Command {
  constructor(context, options) {
    super(context, {
      ...options, 
      name: 'ping',
      description: 'Ping Pong!'
    });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) => {
      builder.setName('ping').setDescription('Ping bot to see if it alive');
    });
  }

  async messageRun(message) {
    const msg = await message.channel.send('Pong!');

    const content = `Pong! \`${msg.createdTimestamp - message.createdTimestamp}ms\``;

    return msg.edit(content);
  }

  async chatInputRun(interaction) {
    const callbackResponse = await interaction.reply({
      content: 'Pong!',
      withResponse: true
    });
    const msg = callbackResponse.resource?.message;

    if (msg && isMessageInstance(msg)) return interaction.editReply(`Pong! \`${msg.createdTimestamp - interaction.createdTimestamp}ms\``);

    return interaction.editReply('Failed to retrieve ping');
  }
}

module.exports = { Ping };