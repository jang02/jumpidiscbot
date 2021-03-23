const Discord = require('discord.js');
const client = new Discord.Client();
const schedule = require('node-schedule');

const pingChannel = process.env.CHANNEL;
const pingRole = process.env.ROLE;
let channel;

client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    channel = client.channels.fetch(pingChannel);
});

const rule = new schedule.RecurrenceRule();
rule.hour = [12, 20];
rule.minute = 50;
rule.second = 0;
rule.tz = 'UTC';

const job = schedule.scheduleJob(rule, function () {
    channel.then(channel => channel.send("<@&" + pingRole + "> DOOM IN 10 MINUTES"));
    channel.catch(console.error);
    console.log("Pinged everyone for doom at: "+ Date().toString());
});



