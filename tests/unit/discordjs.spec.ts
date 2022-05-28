import { test } from '@japa/runner'
import { Client as DiscordJS } from 'discord.js'
import { Assert } from '@japa/assert'

test('Correctly binds discord.js Client to IoC', async ({ assert }: {
    assert: Assert
}) => {
    const Client = await import('@ioc:TicketBot/DiscordJS')
    assert.instanceOf(Client, DiscordJS)
})
  