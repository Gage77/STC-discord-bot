const Discord = require('discord.js');
const client = new Discord.Client();
const botconfig = require('./botconfig.json');

client.on('ready', () => {
    console.log('Torgan Simtral has arrived at the library');
});

client.on('message', (message) => {
    // Ping test
    if (message.content == '*ping') {
        message.channel.send(' pong');
    }
});

client.login(botconfig.token);