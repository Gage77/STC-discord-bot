const Discord = require('discord.js');
const client = new Discord.Client();
const botconfig = require('./botconfig.json');

const welcomeMessage = "test";

client.on('ready', () => {
    console.log('Torgan Simtral has arrived at the library');
});

// Messages
client.on('message', (message) => {
    // Ping test
    if (message.content == '*ping') {
        message.channel.send(' pong');
    }
});

// New guild member listener
client.on('guildMemberAdd', member => {
    // Send message to a designated channel
    member.sendMessage(welcomeMessage);
});

client.login(botconfig.token);