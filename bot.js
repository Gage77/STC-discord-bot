const Discord = require('discord.js');
const client = new Discord.Client();
const botconfig = require('./botconfig.json');

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
    
})

client.login(botconfig.token);