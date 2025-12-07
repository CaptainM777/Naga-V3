const { Precondition } = require('@sapphire/framework');
const { PermissionFlagsBits } = require('discord.js');

class DaiLiPrecondition extends Precondition {
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

    const staffRoles = [this.container.staff.get('Dai Li'), this.container.staff.get('Sentry')];

    const hasPermission = staffRoles.some((r) => roleIds.includes(r)) || member.permissions.has(PermissionFlagsBits.Administrator);

    if (hasPermission) return this.ok();

    return this.error();
  }
}

module.exports = { DaiLiPrecondition };