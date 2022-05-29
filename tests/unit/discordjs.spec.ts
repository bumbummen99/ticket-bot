import { test } from '@japa/runner'
import { Assert } from '@japa/assert'
import DiscordIoC from '@ioc:TicketBot/Discord'
import Discord from 'services/Discord'

test('Correctly binds discord.js Client to IoC', async ({ assert }: {
    assert: Assert
}) => {
    assert.instanceOf(DiscordIoC, Discord)
})
  