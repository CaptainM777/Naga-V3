const { Precondition } = require('@sapphire/framework');
const { PermissionFlagsBits } = require('discord.js');

class AdminPrecondition extends Precondition {
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

    if (member.permissions.has(PermissionFlagsBits.Administrator)) return this.ok();

    return this.error();
  }
}

module.exports = { AdminPrecondition };