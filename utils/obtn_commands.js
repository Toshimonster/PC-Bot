const planco       = require("./planco");
const {Collection} = require('discord.js');
module.exports = new Collection([
    [
        'Planco',
        {
            help     : "Translates Text to Planco",
            execute  : (message) => {
                let transStr = '';
                message.args.forEach((element) => {
                    console.log(element);
                    console.log(planco.get(''));
                    let trans = planco.get(element.toLowerCase());
                    if (trans == undefined) {
                        trans = element.toLowerCase()
                    }
                    transStr += ` ${trans}`
                });
                message.channel.sendTempMessage(`**PLANCO** *->*\n   ${transStr}`)
            }
        }
    ]
]);