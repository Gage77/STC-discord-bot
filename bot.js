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
    // Setup consts for referencing channels in guild
    const ruleChannel = client.channels.find('name', 'rules');
    const ruleChannelDM = "#" + ruleChannel;
    const generalChannel = client.channels.find('name', 'general');
    const generalChannelDM  = "#" + generalChannel;
    
    // Default welcome message
    const welcomeMessage = "Welcome to the Tabletop Gaming Club Discord! Please be sure to check out the " + ruleChannelDM + " channel for the rules of the server. Additionally, if you ever have any questions about the club or the server, feel free to ask any of the officers! Head on over to the " + generalChannelDM + " channel to introduce yourself!";

    // Send message to a members DM
    member.sendMessage(`Hail, ${member}!` + welcomeMessage);
});

client.login(botconfig.token);