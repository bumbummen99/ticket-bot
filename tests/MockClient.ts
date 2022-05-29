import { MockDiscordServer, createDispatchData } from 'discord-mock-server'
import { Client } from 'discord.js';

class MockClient extends Client {
    server: MockDiscordServer

    constructor(options) {
        super(options);
        this.server = new MockDiscordServer({
            gatewayOptions: options.gatewayMocks
        })
    }

    startMockServer(): Promise<void>
    {
        return this.server.start();
    }

    close(): void
    {
        this.destroy();
    }

    async loginSafe(token?: string, awaitGuilds: boolean = true) {
        if (awaitGuilds) {
            const [ready, out] = await Promise.all([
                new Promise(resolve => this.on('ready', resolve)),
                super.login(token)
            ])

            return out
        } else {
            return await super.login(token)
        }
    }

    dispatch(event, data) {
        // @ts-ignore
        this.ws.shards.get(0).onPacket(createDispatchData(event, data));
    }
}

module.exports = MockClient;