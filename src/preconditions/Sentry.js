const { Precondition } = require('@sapphire/framework');
const { PermissionFlagsBits } = require('discord.js');

class SentryPrecondition extends Precondition {
  async messageRun(message) {
    return this.hasPerms(message.member);
  }

  async chatInputRun(interaction) {
    return this.hasPerms(interaction.member);
  }

  async contextMenuRun(interaction) {
    return this.hasPerms(interaction.member);
  }

  async hasPerms(member) {
    if (this.container.developers.includes(member.id)) return this.ok();

    const roleIds = member.roles.cache.map(role => role.id);

    const hasPermission = roleIds.includes(this.container.staff.get('Sentry')) || member.permissions.has(PermissionFlagsBits.Administrator);

    if (hasPermission) return this.ok();

    return this.error();
  }
}

module.exports = { SentryPrecondition };