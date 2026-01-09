const { Command } = require('@sapphire/framework');

const CHANNEL_MENTION_REGEX = /<#([0-9]+)/g;
const SNOWFLAKE_REGEX = /^([0-9]+)$/g;

class Say extends Command {
    constructor(context, options) {
        super(context, {
        ...options, 
        name: 'say',
        description: 'Sends a message in a given channel.',
        detailedDescription: {
            'Command Forms and Arguments': 'say [message] \nsay [channel] [message]'
        },
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) =>
        builder
            .setName('say')
            .setDescription('Sends a message in a given channel')
            .addStringOption((option) => 
            option
                .setName('message')
                .setDescription('The message to send')
                .setRequired(true)
            )
            .addChannelOption((option) =>
            option
                .setName('channel')
                .setDescription('A channel in the current server')
                .setRequired(false)
            )
        )
    }

    async resolveChannel(guild, channel) {
		const mention = CHANNEL_MENTION_REGEX.exec(channel);
		if (mention && mention.length > 1) {
			return guild.channels.fetch(mention[1]);
		}

		if (channel.match(SNOWFLAKE_REGEX)) {
			const channelIdSearch = guild.channels.fetch(channel);
			if (channelIdSearch) {
				return channelIdSearch;
			}
		}

		const channelNameSearch = guild.channels.cache.find(c => c.name === channel);
		if (channelNameSearch) {
			return channelNameSearch;
		}
	}

    async messageRun(message, args) {
        const channelArg = await args.pick('string').catch(() => null);
        const messageArg = await args.pick('string').catch(() => null);

        try {
            const channel = await this.resolveChannel(message.channel.guild, channelArg);
            channel.send(messageArg);
        } catch (err) {
            console.error(err);
            this.container.utils.sendError(message.channel, err)
        }
    }

    async chatInputRun(interaction) {
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const message = interaction.options.getString('message');
        
        try {
            channel.send(message);
        } catch (err) {
            console.error(err);
            interaction.channel.send(err);
        }
    }
}

module.exports = Say;