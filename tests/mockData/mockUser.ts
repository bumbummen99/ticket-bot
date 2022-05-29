import { APIUser } from "discord-api-types/v9"

const mockUser: APIUser = {
    id: '1234567891011121324',
    username: 'fakeuser',
    discriminator: '1234',
    avatar: null,
    bot: true,
    system: false,
    email: 'testuser@test.com',
}

export default mockUser