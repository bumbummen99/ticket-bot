import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import Env from '@ioc:Adonis/Core/Env'
import Logger from '@ioc:Adonis/Core/Logger'
import { Client, ClientOptions, Guild, Intents } from 'discord.js'

export default class Discord {
    bot: Client

    constructor() {
        /* Configure DiscordJS */
        const options: ClientOptions = {
            intents: [Intents.FLAGS.GUILD_MEMBERS]
        }

        /* Overwrite API endpoint if set */
        if (Env.get('DISCORD_API')) {
            options.http = {
                api: Env.get('DISCORD_API'),
                agent: {
                    rejectUnauthorized: false
                }
            }
        }

        /* Initialize the DiscordJS client */
        this.bot = new Client(options)
    }
    
    /**
     * This method simply boots the client by logging it in and 
     * registering listeners.
     */
    async boot(): Promise<void>
    {
        /* Only login if the token is configured (i.e. not testing) */
        if (Env.get('DISCORD_BOT_TOKEN')) {
            /* Login with the configured token */
            await this.bot.login(Env.get('DISCORD_BOT_TOKEN'))
        }

        /* Whenever the bot joins a guild */
        this.bot.on('guildCreate', async (guild: Guild) => {
            await this.registerSlashCommands(guild.id)
        })
    }

    /**
     * This method registers the bot's slash commands to the given guild.
     * 
     * @param guildId The snowflake/id of the guild to register our commands to
     */
    async registerSlashCommands(guildId: string): Promise<void> {
        /* Make sure the bot is ready and logged in first */
        if (! this.bot.isReady()) {
            throw new Error('Slash commands could not be registered: Bot is not ready yet!')
        }

        /* Collect available commands */
        const commands = [
            new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
            new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
            new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
        ].map(command => command.toJSON());

        /* Initialize discord.js REST client */
        const rest = new REST({ version: '9' }).setToken(Env.get('DISCORD_BOT_TOKEN'));
        
        /* Publish the slash commands to the guild */
        await rest.put(Routes.applicationGuildCommands(this.bot.user.id, guildId), { body: commands })

        Logger.info(`Successfully registered application commands to guild ${guildId}.`)
    }
}
