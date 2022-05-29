import { test } from '@japa/runner'
import { Assert } from '@japa/assert'
import DiscordIoC from '@ioc:TicketBot/Discord'
import Discord from 'services/Discord'
import { MockDiscordServer } from 'discord-mock-server'

test.group('DiscordJS integration tests', group => {
    let server: MockDiscordServer

    group.setup(async () => {
        server = new MockDiscordServer()

        await server.start()
    })

    group.teardown(async () => {
        await server.stop()
    })

    test('It initialized DiscordJS', async ({ assert }: {
        assert: Assert
    }) => {
        assert.instanceOf(DiscordIoC, Discord)
    })
})