const Discord = require("discord.js");
const auth = require('./auth.json');
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith(".ping")) {
    message.channel.send("Pong!");
  }
  if (message.content.startsWith(".mute")) {
    if (message.member.voice.channel) {
        let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {
          member.voice.setMute(true);
        }
        message.channel.send("Muted!");
    } else {
      message.reply('You need to join a voice channel first!');
    }
}
  if (message.content.startsWith(".unmute")) {
    if (message.member.voice.channel) {
        let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {
          member.voice.setMute(false);
        }
        message.channel.send("Unmuted!");
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});

client.login(auth.token);