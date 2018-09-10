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
    const wchannel = client.channels.find('name', welcome);
    wchannel.send(`Hail, ${member}! Please read the Discord rules pinned in this channel. Also please read the topics of each channel before posting to said channel to be sure you remain on-topic.`);
});

client.login(botconfig.token);