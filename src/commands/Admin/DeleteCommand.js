const { Command } = require('@sapphire/framework');

class DeleteCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options, 
      name: 'deletecommand',
      aliases: ['deleteapp'],
      description: 'Deletes an application command (global or guild-specific) by its ID.',
      detailedDescription: { usage: ['n.deletecommand [command ID]'] },
      preconditions: ['Admin']
    });
  }

  async messageRun(message, args) {
    const commandId = await args.pick('string').catch(() => null);
    if (!commandId) {
      this.container.utils.sendError(message.channel, 'You have to provide a command ID!');
      return;
    }

    const client = this.container.client;

    const globalCommands = await client.application.commands.fetch();

    const guild = await client.guilds.fetch(message.guild.id);
    const guildCommands = await guild.commands.fetch();

    if ([...globalCommands.keys()].includes(commandId)) {
      const command = await client.application.commands.delete(commandId);
      this.container.utils.sendSuccess(message.channel, `Successfully deleted global application command ${commandId} (${command.name})`);
    } else if ([...guildCommands.keys()].includes(commandId)) {
      const command = await guild.commands.delete(commandId);
      this.container.utils.sendSuccess(message.channel, `Successfully deleted guild application command ${commandId} (${command.name})`);
    } else {
      this.container.utils.sendError(message.channel, 'Unable to find command!');
    }
  }
}

module.exports = { DeleteCommand };