const {Collection} = require('discord.js');
module.exports = new Collection([
    [
        'Coins',
        {
            help     : "Displays the amount of Pcoins currently in your account",
            execute  : (message) => {
                message.channel.sendTempMessage(`${message.author.username} currently has ${message.member.coins} Pcoins`)
            }
        }
    ]
]);