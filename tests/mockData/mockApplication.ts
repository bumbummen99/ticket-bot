import { ApplicationFlags, APIApplication } from 'discord-api-types/v9'

const mockApplication: APIApplication = {
    id: '1234562345232',
    name: 'MockApplication',
    icon: null,
    description: 'A mock application',
    bot_public: true,
    flags: ApplicationFlags.GatewayGuildMembers,
    bot_require_code_grant: false,
    verify_key: '',
    summary: '',
    team: null,
}

export default mockApplication