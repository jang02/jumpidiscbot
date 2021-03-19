const Discord = require('discord.js');
const client = new Discord.Client();
const schedule = require('node-schedule');
require("dotenv").config();


let pingChannel = "";

client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const rule = new schedule.RecurrenceRule();
rule.hour = [11, 19];
rule.minute = [50];
rule.tz = 'UTC';


client.on('message', msg => {
    if(pingChannel.toString().length !== 0){
        msgChannelSet(msg);
    }
    else{
        msgChannelNotSet(msg)
    }
});

function setRole(role){
    const job = schedule.scheduleJob(rule, function () {
        const channel = client.channels.fetch(pingChannel);
        channel.then(channel => channel.send("<@&"+role+"> DOOM IN 10 MINUTES"));
        channel.catch(console.error);
    });
}

function msgChannelSet(msg) {
    const channel = client.channels.fetch(pingChannel);

    if (msg.content.match(/!j setChannel /g) !== null) {
        pingChannel = msg.content.split("!j setChannel ").pop().toString();
        channel.then(channel => channel.send("Channel successfully set to " + pingChannel));
        channel.catch(console.error);
    }
    else if (msg.content.match(/!j setRole /g) !== null) {
        setRole(msg.content.split("!j setRole ").pop().toString());
        channel.then(channel => channel.send("Role successfully set to <@&" + msg.content.split("!j setRole ").pop().toString()+">"));
        channel.catch(console.error);
    }
}
function msgChannelNotSet(msg){
    if (msg.content.match(/!j setChannel /g) !== null) {
        pingChannel= msg.content.split("!j setChannel ").pop().toString();
        msg.channel.send("Channel successfully set to " + pingChannel)
    }
    else if (msg.content.match(/!j setRole /g) !== null) {
        setRole(msg.content.split("!j setRole ").pop().toString());
        msg.channel.send("Role successfully set to <@&" + msg.content.split("!j setRole ").pop().toString()+">")
    }
}
