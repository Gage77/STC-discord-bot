const Discord = require('discord.js');
const client = new Discord.Client();
const botconfig = require('./botconfig.json');
const meetings = require('./meetings.json');

client.on('ready', () => {
    console.log('Torgan Simtral has arrived at the library');
});

// Messages
client.on('message', (message) => {
    // Ping test
    if (message.content == '*ping') {
        message.channel.send(' pong');
    }
    // Print up time
    else if (message.content == '*ut') {
        let totalSeconds = (client.uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds %60;

        let uptime = `Torgan has been up for ${hours} hours, ${minutes} minutes and ${seconds} seconds.`;
        message.channel.send(uptime);
    }
    // Shows meeting location and time
    else if (message.content == '*meeting') {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth();
        let yyyy = today.getFullYear();

        let mmddyyyy = mm + '/' + dd + '/' + yyyy;

        let meetingDays = meetings.saturdayMeetings;
        for (let i = 0; i < meetingDays.length; i++) {
            if (Date.parse(meetingDays[i].date + '/' + yyyy) >= Date.parse(mmddyyyy)) {
                message.channel.send('This weeks meeting will be held on Saturday, ' + meetingDays[i].date + ' in ' + meetingDays[i].room);
                break;
            }
        }
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