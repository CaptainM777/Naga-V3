const { Command } = require('@sapphire/framework');

class ShowCommands extends Command {
  constructor(context, options) {
    super(context, {
      ...options, 
      name: 'showcommands',
      aliases: ['showapp', 'showapps'],
      description: 'Shows all application commands, both global and guild-specific.',
      preconditions: ['Admin']
    });
  }

  async messageRun(message) {
    const client = this.container.client;

    const globalCommands = await client.application.commands.fetch();

    const guild = await client.guilds.fetch(message.guild.id);
    const guildCommands = await guild.commands.fetch();

    const formattedGlobalCommands = [...globalCommands].map(([id, command]) => `${command.name}: ${id}`);
    const formattedGuildCommands = [...guildCommands].map(([id, command]) => `${command.name}: ${id}`);

    const fields = [];
    if (formattedGlobalCommands.length > 0) fields.push({ name: 'Global', value: formattedGlobalCommands.join('\n') });
    if (formattedGuildCommands.length > 0) fields.push({ name: 'Guild', value: formattedGuildCommands.join('\n') });

    const embed = {
      color: 9031664,
      author: {
        name: `All Application Commands`,
        iconURL: this.container.client.user.displayAvatarURL()
      },
      fields: fields
    };

    await message.channel.send({ embeds: [embed] });
  }
}

module.exports = { ShowCommands };