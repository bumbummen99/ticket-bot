import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/builders'
import { Routes } from 'discord-api-types/v9'
import Env from '@ioc:Adonis/Core/Env'
import Logger from '@ioc:Adonis/Core/Logger'
import { Client, Intents } from 'discord.js'

export default class Discord {
    bot: Client

    constructor() {
        this.bot = new Client({
            intents: [Intents.FLAGS.GUILD_MEMBERS]
        })
    }
    
    async boot(): Promise<void>
    {
        /* Login with the configured token */
        await this.bot.login(Env.get('DISCORD_BOT_TOKEN'))

        /* Wait for ready or error */
        await new Promise<void>((resolve, reject) => {           
            this.bot.once('ready', () => {
                /* Notify once bot is ready */
                Logger.info(`Discord.js is ready!`)

                /* Remove error listener */
                this.bot.off('error', reject)

                /* Proceed execution */
                resolve()
            })

            this.bot.once('error', reject)
        })
    }

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
