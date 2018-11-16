const Discord = require('discord.js');
const client = new Discord.Client();
const botconfig = require('./botconfig.json');
const meetings = require('./meetings.json');

const commands = [
    "(1) help - Display all commands that this bot has integrated",
    "(2) ping - Expect response pong from bot to test whether it is online",
    "(3) ut - Displays how long the bot has been up in hours/minutes/seconds",
    "(4) meeting - Displays when and where the next general meeting will be held"
];

// Sends awake message every 24 hours
function stayAwake () {
    const botChannel = client.channels.find('name', 'bot-testing');
    var now = new Date();
    const delay = 24 * 60 * 60 * 1000 // 24 hours
    var start = delay - (now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();

    setTimeout(function stillAwake() {
        // use the message's channel (TextChannel) to send a new message
        botChannel.send("Still awake");
        setTimeout(stillAwake, delay);
    }, start);
}

client.on('ready', () => {
    console.log('Torgan Simtral has arrived at the library');
    // Call the stay awake function to keep bot from timing out
    stayAwake();
});

// Messages
client.on('message', (message) => {
    // Show all commands command
    if (message.content == '*help') {
        let allCommands = "Here is a list of all commands currently available: \n";
        for (let i = 0; i < commands.length; i++) {
            allCommands += commands[i] + "\n";
        }
        message.channel.send(allCommands);
    }
    // Ping test
    else if (message.content == '*ping') {
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
        var today = message.createdAt.toString();
        console.log(today);
        var dd = today.substring(8, 10);
        var mm = today.substring(4, 7);
        mm = monthNums[mm];
        var yyyy = today.substring(11, 15);

        var mmddyyyy = mm + '/' + dd + '/' + yyyy;
        console.log(mmddyyyy);

        var meetingDays = meetings.saturdayMeetings;
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

monthNums = {
    "Jan": 01,
    "Feb": 02,
    "Mar": 03,
    "Apr": 04,
    "May": 05,
    "Jun": 06,
    "Jul": 07,
    "Aug": 08,
    "Sep": 09,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
};

client.login(botconfig.token);