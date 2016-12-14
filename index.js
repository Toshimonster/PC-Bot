const utils    = require("./utils/util");
const discord  = utils.discord;
const pc_bot   = new discord.Client();
const commands = {
    base       : require("./utils/base_commands"),
    obtainable : require("./utils/obtn_commands")
};

pc_bot.on("message", (message) => {

    if (message.member.bot) return;
    if (!message.content.startsWith(utils.config.prefix)) return;
    message.casheValues();
    message.member.casheValues();

    console.log("<" + message.channel.name + "> " + message.author.username + " : " + message.content);

    let exmic = commands.base.get(message.cmd);
    if (exmic != undefined) {
        exmic.execute(message)
    } else {
        exmic = commands.obtainable.get(message.cmd);
        if (exmic != undefined || message.cmd in message.member.exmic) {
            exmic.execute(message);
        } else {
            message.channel.sendTempMessage(`"${message.p_cmd}" is not recognised as a usable command, for ${message.author.username}`)
        }
    }

});

pc_bot.on('ready', () => {
    console.log(`${pc_bot.user.username} is up and running!`)
});

pc_bot.login(utils.config.token || process.argv[2]);