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
    channel.then(channel => channel.send("last test"));
    channel.catch(console.error);
});

const rule = new schedule.RecurrenceRule();
rule.hour = [11, 19];
rule.minute = [50];
rule.tz = 'UTC';

const job = schedule.scheduleJob(rule, function () {
    channel.then(channel => channel.send("<@&" + pingRole + "> DOOM IN 10 MINUTES"));
    channel.catch(console.error);
});



