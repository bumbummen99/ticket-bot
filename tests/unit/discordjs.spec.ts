import { test } from '@japa/runner'
import { Assert } from '@japa/assert'
import DiscordIoC from '@ioc:TicketBot/Discord'
import Discord from 'services/Discord'

test.group('DiscordJS integration tests', () => {
    test('It initialized DiscordJS', async ({ assert }: {
        assert: Assert
    }) => {
        assert.instanceOf(DiscordIoC, Discord)
    })
})