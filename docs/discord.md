---
description: "Send staff logs to Discord webhooks and use Discord roles as staff groups in the Alkmaar Admin Panel."
---

# Discord logs

Every staff action is always recorded on the panel's **Logs** page. Discord is
optional on top of that.

All of this lives in `config_server.lua`, which players can never read — so
tokens and webhooks are safe there.

## Webhooks

```lua
Config.Discord = {
    Enabled   = true,
    BotName   = 'Admin Panel',
    AvatarUrl = '',

    Webhooks = {
        default = 'https://discord.com/api/webhooks/...',
    },
}
```

Everything goes to `default` unless a category has its own webhook:

```lua
Webhooks = {
    default = 'https://discord.com/api/webhooks/...',
    ban     = 'https://discord.com/api/webhooks/...',
},
```

## Choosing categories

```lua
Log = {
    kick      = true,
    ban       = true,
    warn      = true,
    money     = true,
    freeze    = false,
    staffchat = false,
},
```

Set a category to `false` and it stays out of Discord — it is still on the Logs
page.

## Discord roles as staff groups

Let Discord decide who is staff. Make a bot at
[discord.com/developers](https://discord.com/developers), invite it to your
server, then:

```lua
Config.DiscordRoles = {
    BotToken = 'your-bot-token',
    GuildId  = 'your-server-id',
    Roles = {
        ['123456789012345678'] = 'admin',
        ['987654321098765432'] = 'moderator',
    },
    RefreshMinutes = 5,
}
```

And switch the source on in `config.lua`:

```lua
Config.Permissions.GroupSource = 'discord'
```

Or combine it — the highest rank wins:

```lua
GroupSource = { 'builtin', 'discord' }
```

## Not working?

| Problem | Check |
|---|---|
| Nothing arrives | `Enabled = true` and a webhook under `default` |
| One category missing | That category is `true` under `Log` |
| Roles do nothing | `GroupSource` includes `'discord'`, and the bot is in your server |
| `HTTP 401` in console | The bot token is wrong |
