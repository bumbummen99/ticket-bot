import {
  APIGuild,
  GuildDefaultMessageNotifications,
  GuildExplicitContentFilter,
  GuildFeature,
  GuildHubType,
  GuildMFALevel,
  GuildNSFWLevel,
  GuildPremiumTier,
  GuildSystemChannelFlags,
  GuildVerificationLevel,
} from 'discord-api-types/v9'
import mockUser from './mockUser'

const mockGuild: APIGuild = {
  id: '123456789',
  name: 'MockGuild',
  icon: null,
  splash: null,
  discovery_splash: null,
  owner_id: mockUser.id,
  owner: true,
  permissions: '8',
  region: 'us',
  afk_channel_id: null,
  afk_timeout: 0,
  verification_level: GuildVerificationLevel.None,
  default_message_notifications: GuildDefaultMessageNotifications.AllMessages,
  explicit_content_filter: GuildExplicitContentFilter.MembersWithoutRoles,
  roles: [],
  emojis: [],
  features: [GuildFeature.Community, GuildFeature.Discoverable],
  application_id: null,
  system_channel_id: null,
  system_channel_flags: GuildSystemChannelFlags.SuppressGuildReminderNotifications,
  rules_channel_id: null,
  max_presences: null,
  vanity_url_code: null,
  description: null,
  banner: null,
  premium_tier: GuildPremiumTier.Tier3,
  premium_subscription_count: 23,
  preferred_locale: 'en-US',
  public_updates_channel_id: null,
  nsfw_level: GuildNSFWLevel.Default,
  stickers: [],
  premium_progress_bar_enabled: true,
  mfa_level: GuildMFALevel.None,
  hub_type: GuildHubType.Default,
}

export default mockGuild