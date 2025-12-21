const { Command, Resolvers } = require('@sapphire/framework');

class Holographic extends Command {
  constructor(context, options) {
    super(context, {
      ...options, 
      name: 'holographic',
      aliases: ['holo'],
      description: 'Set a role to a holgraphic style with the color values `primaryColor = A9C9FF`, `secondaryColor = FFBBEC`, and `tertiaryColor = FFC3A0`.',
      detailedDescription: {
        'Command Forms and Arguments': '`n.holographic [role]`\n' +
                                       '**Role:** ID or name. If it\'s a name with multiple words, it must be wrapped in double quotes. Required.'
      },
      preconditions: ['Sentry'],
      requiredClientPermissions: 'ManageRoles'
    });
  }

  async messageRun(message, args) {
    const roleArg = await args.pick('string').catch(() => null);

    if (!roleArg) return this.container.utils.sendError(message.channel, 'You need to provide a role!');

    const roleResult = await Resolvers.resolveRole(roleArg, message.guild);

    if (roleResult.isErr() && roleResult.unwrapErr() === 'roleError') {
      this.container.utils.sendError(message.channel, 'Unknown role!');
      roleResult.unwrapRaw();
    }

    const role = roleResult.unwrap();

    const oldRoleColors = Object.values(role.colors).filter(Boolean).map(int => this.container.utils.integerToHex(int));

    const confirmationMessage = [
      `Successfully changed role <@&${role.id}> (${role.name}, ${role.id}) to a holographic style.`,
      `\n\n__Old Colors__\nPrimary: \`${oldRoleColors[0]}\``
    ];

    try {
      await role.edit({
        colors: {
          primaryColor: 11127295,
          secondaryColor: 16759788,
          tertiaryColor: 16761760
        }
      });

      if (oldRoleColors[1]) confirmationMessage.push(`\nSecondary: \`${oldRoleColors[1]}\``);
      if (oldRoleColors[2]) confirmationMessage.push(`\nTertiary: \`${oldRoleColors[2]}\``);

      this.container.utils.sendSuccess(message.channel, confirmationMessage.join(' '));
    } catch (err) {
      console.error(err);
      this.container.utils.sendError(message.channel, `An error occurred: \`\`\`${err}\`\`\``);
    }
  }
}

module.exports = { Holographic };