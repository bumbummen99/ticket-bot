import { test } from '@japa/runner'
import Client from '@ioc:TicketBot/DiscordJS'
import { Client as DiscordJS } from 'discord.js'

test('Correctly binds discord.js Client to IoC', async ({ assert }) => {
    assert.equals((Client instanceof DiscordJS) === true)
})
  