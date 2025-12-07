const { Precondition } = require('@sapphire/framework');

class DevOnlyPrecondition extends Precondition {
  async messageRun(message) {
    return this.isDeveloper(message.author.id);
  }

  async chatInputRun(interaction) {
    return this.hasPerms(interaction.user.id);
  }

  async contextMenuRun(interaction) {
    return this.hasPerms(interaction.user.id);
  }

  async isDeveloper(userId) {
    return this.container.developers.includes(userId)
      ? this.ok()
      : this.error();
  }
}

module.exports = { DevOnlyPrecondition };