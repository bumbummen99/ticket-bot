import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import { Client, Intents } from 'discord.js'

export default class DiscordBotProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.singleton('TicketBot/DiscordJS', () => {
        /* Initialize DiscordJS */
        const bot = new Client({
            intents: [ Intents.FLAGS.GUILD_MEMBERS ]
        });

        /* Login with the configured token */
        bot.login(Env.get('DISCORD_BOT_TOKEN'))

        /* Attach listeners */
        // TODO

        /* Return the instance */
        return bot
    })
  }

  public async boot() {
    // IoC container is ready
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
