import { test } from '@japa/runner'
import { Assert } from '@japa/assert'
import { Client as DiscordJS } from 'discord.js'
import Client from '@ioc:TicketBot/DiscordJS'

test('Correctly binds discord.js Client to IoC', async ({ assert }: {
    assert: Assert
}) => {
    assert.instanceOf(Client, DiscordJS)
})
  