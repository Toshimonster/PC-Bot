const o_cmd = require("./obtn_commands");
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
    ],
    [
        'Help',
        {
            help     : "Help for commands... #helpception",
            execute  : (message) => {
                let thiscmd = message.alias[2];
                thiscmd = module.exports.get(thiscmd);
                if (thiscmd == undefined) {
                    thiscmd = o_cmd.get(message.alias[2]);
                    if (thiscmd == undefined) {
                        thiscmd = "Not a recognised command"
                    } else {
                        thiscmd = `**[OBTAINABLE]**\n\t${thiscmd.help}`
                    }
                } else {
                    console.log(thiscmd);
                    thiscmd = thiscmd.help
                }
                message.channel.sendTempMessage(`**HELP** __*${message.alias[2]}*__ *->*\n\t${thiscmd}`)
            }
        }
    ]
]);