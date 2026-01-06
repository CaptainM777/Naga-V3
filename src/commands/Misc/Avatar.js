const { Command } = require('@sapphire/framework');

class Avatar extends Command {
  constructor(context, options) {
    super(context, {
      ...options, 
      name: 'avatar',
      aliases: ['useravatar'],
      description: 'Display a user\'s avatar.',
      detailedDescription: {
        'Command Forms and Arguments': '`n.avatar [user]`\n'
      },
    });
  }

  registerApplicationCommands(registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('avatar')
        .setDescription('Returns a user avatar')
        .addStringOption((option) =>
          option
            .setName('user')
            .setDescription('User')
            .setRequired(false)
        )
    )
  }

    async messageRun(message, args) {
        try { 
            let userArg = await args.pick('string').catch(() => null);
            let user = message.mentions.users.first() || message.channel.guild.members.cache.get(userArg) || msg.author;
            if (user.constructor.name === 'User') user = message.channel.guild.members.cache.get(user.id); // Surely there are better ways to do this

            let avatar = user.displayAvatarURL() || user.avatarURL() // Fetches user's guild avatar, falls back to user avatar if one isn't set

            let embed = {
                title: 'Avatar',
                color: user.displayColor || this.container.utils.getColor('blue'),
                description: `${user.displayName} (${user.user.username})`,
                image: { url: avatar },
                footer: { text: user.id },
                timestamp: new Date()
            };

            message.channel.send({ embeds: [embed] })
        } catch(err) {
            console.error(err);
        }
    }

    async chatInputRun(interaction) {
        const userArg = interaction.options.getString('user');
        await interaction.deferReply();

        try { 
            let user = interaction.mentions.users.first() || interaction.channel.guild.members.cache.get(userArg) || interaction.author;
            if (user.constructor.name === 'User') user = interaction.channel.guild.members.cache.get(user.id); // Surely there are better ways to do this

            let avatar = user.displayAvatarURL() || user.avatarURL() // Fetches user's guild avatar, falls back to user avatar if one isn't set

            let embed = {
                title: 'Avatar',
                color: user.displayColor || this.container.utils.getColor('blue'),
                description: `${user.displayName} (${user.user.username})`,
                image: { url: avatar },
                footer: { text: user.id },
                timestamp: new Date()
            };

            interaction.editReply({ embeds: [embed] })
        } catch(err) {
            console.error(err);
        }
    }
}

module.exports = { Avatar };