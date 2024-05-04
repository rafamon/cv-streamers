require('dotenv').config();
const TwitchAPI = require('node-twitch').default
const Discord = require('discord.js');

const discordClient = new Discord.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES'],
    partials: ["MESSAGE", "CHANNEL"]
});

const twitch = new TwitchAPI({
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET
});

const twitchUrl = 'https://www.twitch.tv/'

const notificationChannelName = 'cv-streamers';

const streamersArray = [
    //ADD TWITCH TV IDS HERE
];

const streamersMap = new Map();
streamersArray.forEach(string => {
    streamersMap.set(string, false);
});

const streamersName = Array.from(streamersMap.keys());

function monitorStreams() {
    streamersName.forEach(name => {
        checkTwitch(name);
    })
}

async function checkTwitch(twitchId) {
    try {
        const data = await twitch.getStreams({ channel: twitchId });
        const resp = data.data[0];
        if (resp) {
            console.log(`Stream is online ${twitchId}`);
            if (!streamersMap.get(twitchId)) {
                notifyDiscord(twitchId);
            }
            streamersMap.set(twitchId, true);
        } else {
            streamersMap.set(twitchId, false);
        }
    } catch (error) {
        console.error('Error checkTwitch:', error);
    }
}

function notifyDiscord(twitchId) {
    discordClient.guilds.cache.forEach(guild => {
        const guildName = guild.name;
        console.log(`Checking guild: ${guildName}`);

        const channel = guild.channels.cache.find(channel =>
            channel.name === notificationChannelName &&
            channel.type === 'GUILD_TEXT'
        );

        if (channel) {
            console.log(`Channel found for guild ${guildName}`);
            channel.send(`${twitchId} sta live!\n${twitchUrl}${twitchId}`);
        } else {
            const firstTextChannel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT');
            if (firstTextChannel) {
                console.log(`No channel found with name ${notificationChannelName} in guild ${guildName}. Sending message to the first text channel available.`);
                firstTextChannel.send(`${twitchId} sta live!\n${twitchUrl}${twitchId}`);
            } else {
                console.error(`No text channels available in guild ${guildName} to send message.`);
            }
        }
    });
}

discordClient.login(process.env.DISCORD_TOKEN);

monitorStreams();
setInterval(monitorStreams, 60000);