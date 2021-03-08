module.exports = {
  name: "exec",
  description: "Execututes the commands provided. Owner only",
  aliases: ["e"],
  ownerOnly: true,
  guildOnly: false,
  args: true,
  cooldown: 3,
  usage: "<code>",
  category: "utility",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const execa = require("execa");
    let returned;
    let command = args.join(" ");
    let success;
    const embed = new Discord.MessageEmbed()
      .addField(`📤 Original Command`, "```bash\n" + command + "```")
      .setFooter(`Requested by ${msg.author.tag}`);

    try {
      returned = execa.commandSync(command, {
        shell: true,
      });

      embed.setColor(config.colors.main);
      embed.setAuthor(`Success!`, avatar);
      embed.addField(`📥 Result`, "```bash\n" + returned.stdout + "```");
      msg.react(config.emojis.success);
    } catch (e) {
      embed.setColor(config.colors.error);
      embed.setAuthor(`Error`, avatar);
      embed.addField(`📥 Result`, "```bash\n" + e.stderr + "```");
      msg.react(config.emojis.error);
    }
    msg.channel.send(embed);
  },
};
