const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
const bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // It will listen for messages that will start with `.`
    if (message.substring(0, 1) == '.') {
        let args = message.substring(1).split(' ');
        const cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            /*case 'mute':
                if (message.member.voice.channel) {
                    let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
                    for (const [memberID, member] of channel.members) {
                      // if (member != message.member)
                      member.voice.setMute(true);
                    }
                    bot.sendMessage({
                        to: channelID,
                        message: 'Muted!'
                    });
                } else {
                    message.reply('You need to join a voice channel first!');
                }
            break; */
         }
     }
});