let discord = require("discord.js");
let aliases = require("./aliases");
let users   = require("./users");
let config  = require("./config");
let fs      = require("fs");

users.forEach((element, index) => {
    users[index][1].items = new discord.Collection(users[index][1].items);
});
users = new discord.Collection(users);

String.prototype.aliasize = function() {
    if (aliases[this.toLowerCase()]) return aliases[this];
    return this;
};

Array.prototype.aliasize = function() {
    let aliasized = [];
    this.forEach( function(element) {
        if (typeof(element) == 'string') {
            aliasized.push(element.aliasize())
        }
        aliasized.push(element)
    });
    return aliasized
};

discord.Collection.prototype.saveUsers = function(reason) {
    let data = Array.from(this);
    data.forEach((element, index) => {
        data[index][1].items = Array.from(data[index][1].items)
    });
    fs.writeFile('./utils/users.js',
        `module.exports = ${JSON.stringify(data, null, "\t")};`,
        'utf8',
        () => {console.log(`SAVE | ${reason} |`);} );
};

discord.Message.prototype.casheValues = function() {
    discord.Message.prototype.message = this.content.replace(config.prefix, "");
    discord.Message.prototype.params  = this.message.split(" ");
    discord.Message.prototype.args    = this.message.split(" ").slice(1);
    discord.Message.prototype.p_cmd   = this.message.split(" ")[0];
    discord.Message.prototype.cmd     = this.message.split(" ")[0].aliasize();
    discord.Message.prototype.p_args  = this.message.replace(this.p_cmd, "").slice(1);
    discord.Message.prototype.alias   = this.message.split(" ").aliasize();
    discord.Message.prototype.mention = this.mentions.users;
};

discord.GuildMember.prototype.casheValues = function() {
    let data = users.get(this.id);
    if (data == undefined) {
        users.set(this.id, {
            coins : 1000,
            items : new discord.Collection(),
            exmic : new discord.Collection()
        });
        users.saveUsers(`New user { ${this.id}, ${this.user.username} }`);
        data = users.get(this.id);
    }
    this.coins = data.coins;
    this.items = data.items;
    this.exmic = data.exmic
};

discord.GuildMember.prototype.isMod = function() {
    if (!this.hasPermission) {return false}
    return this.hasPermission('BAN_MEMBERS')
};

discord.TextChannel.prototype.sendTempMessage = function(content, message = false) {
    if(message) {
        message.delete(1000)
    }
    this.sendMessage(content)
        .then( (msg) => {
            msg.delete(5000);
        });
};

module.exports = {
    discord,
    aliases,
    users,
    config
};