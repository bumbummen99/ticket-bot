import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import Logger from '@ioc:Adonis/Core/Logger'
import { Client, Intents } from 'discord.js'

export default class DiscordBotProvider {
  constructor(protected app: ApplicationContract) { }

  public register() {
    // Register your own bindings
    this.app.container.singleton('TicketBot/DiscordJS', () => {
      /* Initialize DiscordJS */
      return new Client({
        intents: [Intents.FLAGS.GUILD_MEMBERS]
      })
    })
  }

  public async boot() {
    /* Retrieve the DiscordJS client singleton */
    const bot: Client = this.app.container.use('TicketBot/DiscordJS')

    /* Login with the configured token */
    await bot.login(Env.get('DISCORD_BOT_TOKEN'))

    /* Notify once bot is ready */
    bot.once('ready', () => {
      Logger.info(`Discord.js is ready!`)
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    /* Retrieve the DiscordJS client singleton */
    const bot: Client = this.app.container.use('TicketBot/DiscordJS')

    /* Gracefully shutdown DiscordJS framework */
    bot.destroy()
  }
}
