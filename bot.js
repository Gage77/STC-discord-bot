const Discord = require('discord.js');
const client = new Discord.Client();
const botconfig = require('./botconfig.json');

const welcomeMessage = "Welcome to the Tabletop Gaming Club Discord! Please be sure to check out the \"rules\" channel for the general rules of the server. Additionally, if you ever have any questions about the club or the server, feel free to ask any of the officers!";
const welcomeChannel = 'welcome'

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
    const wchannel = client.channels.find('name', welcomeChannel);
    wchannel.send(`Hail, ${member}!` + welcomeMessage);
});

client.login(botconfig.token);