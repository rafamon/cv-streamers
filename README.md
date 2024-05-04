# cv-streamers
CV Streamers is a Discord bot designed to monitor Twitch streams of Cape Verdean content creators. When a streamer from Cape Verde goes live, the bot sends notifications to all servers it is a member of.

# Features
- Monitors Twitch streams of Cape Verdean content creators.
- Sends live notifications to Discord servers.

# Streamer Registration / Registro de Streamers

### English

If you are a Cape Verdean Twitch streamer and wish to have your stream monitored by this bot, please message "rafix" or "pj2896" on Discord.

### Portuguese (Português)

Se és um streamer cabo-verdiano no Twitch e desejas que o teu stream seja monitorado por este bot, por favor, envie uma mensagem para "rafix" ou "pj2896" no Discord.

# Discord Server Invitation / Convite para o Servidor Discord

### English

If you have a Discord gaming community and want to have this bot on your server, here is the invitation link: [Bot Invitation Link](https://discord.com/oauth2/authorize?client_id=1220575695194034246)

The bot will attempt to send notifications to a text channel named "cv-streamers". If it doesn't find one, it will send notifications to the first available text channel.

### Portuguese (Português)

Se tens uma comunidade de jogos no Discord e desejas ter este bot no teu servidor, aqui está o link de convite: [Link de Convite do Bot](https://discord.com/oauth2/authorize?client_id=1220575695194034246)

O bot tentará enviar notificações para um canal de texto chamado "cv-streamers". Se não encontrar um, enviará notificações para o primeiro canal de texto disponível.

## Configuration

To run this project locally, you'll need to set up your own configuration file to store sensitive information such as API keys and tokens. Follow these steps:

1. Create a `.env` file in the root directory of the project.
2. Add your Twitch API and Discord credentials to the `.env` file in the following format:

    TWITCH_CLIENT_ID=your_twitch_client_id
   
    TWITCH_CLIENT_SECRET=your_twitch_client_secret
   
    DISCORD_TOKEN=your_discord_token

Replace `your_twitch_client_id`, `your_twitch_client_secret` and `your_discord_token` with your own credentials obtained from the respective platforms.

3. Additionally, in the `index.js` file, you'll find an array named `streamersArray`. Add the Twitch IDs of the streamers you wish to monitor to this array.

```javascript
const streamersArray = [
    "twitch_id_1",
    "twitch_id_2",
    // Add more Twitch IDs here
];
