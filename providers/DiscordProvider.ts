import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Discord from 'App/Discord'

export default class DiscordProvider {
  constructor(protected app: ApplicationContract) { }

  public register() {
    // Register your own bindings
    this.app.container.singleton('TicketBot/Discord', () => {
      /* Initialize DiscordJS */
      return new Discord()
    })
  }

  public async boot() {
    /* Retrieve the DiscordJS Service singleton */
    const discord: Discord = this.app.container.use('TicketBot/Discord')

    /* Boot the DiscordJS Service */
    await discord.boot()

    console.log('Eins!')

    /* Register slash commands to all guilds we are joined to */
    for (const [id, guild] of discord.bot.guilds.cache) {
      await discord.registerSlashCommands(guild.id)
    }

    console.log('Zwei!')
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    /* Retrieve the DiscordJS client singleton */
    const discord: Discord = this.app.container.use('TicketBot/Discord')

    /* Gracefully shutdown DiscordJS framework */
    discord.bot.destroy()
  }
}
