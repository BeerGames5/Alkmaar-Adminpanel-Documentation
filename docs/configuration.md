---
description: "All configuration options for the Alkmaar Admin Panel in config.lua and config_server.lua."
---

# Configuration

Everything you can change lives in two files. Both keep their comments, so the
file itself explains each option.

| File | What it holds |
|---|---|
| `config.lua` | Language, framework, commands, permissions, UI, features |
| `config_server.lua` | Discord logs, Discord roles, and your own Lua hooks |

::: warning Keep these when updating
These two files are yours. When you update the panel, keep your copies and
replace everything else.
:::

## The basics

```lua
Config.Locale = 'en'        -- en, nl, de, fr, es
Config.Framework = 'auto'   -- auto, esx, qb, qbox, none
Config.Inventory = 'auto'   -- auto, ox, qb, qs, custom
Config.Debug = false
```

`'auto'` detects what you run. Set it explicitly only if detection is wrong.

## Sections in config.lua

| Section | What it controls |
|---|---|
| `Commands` | Command names and the open key — see [Commands](/commands) |
| `Accounts` | Which money accounts exist (cash, bank, …) |
| `Database` | Table and column names, if yours differ |
| `Permissions` | How staff are recognised — see [Staff & permissions](/permissions) |
| `AdminGroups` | Your staff ranks and what each may do |
| `Duty` | Whether staff must be on duty, and how that is checked |
| `Integrations` | Housing, garages and other scripts — see [Integrations](/integrations) |
| `Reports` | Report categories and behaviour |
| `Tickets` | Ticket alerts for staff |
| `Warnings` | Warning levels and automatic punishments |
| `Anticheat` | Detections and what happens on a hit |
| `AltDetection` | Alt-account detection |
| `Activity` | Playtime and activity tracking |
| `Dashboard` | What the dashboard shows |
| `Headshots` | Player mugshots |
| `VoiceChannels` | Staff voice channels |
| `Map` / `TeleportLocations` | The live map and teleport presets |
| `WeatherTypes` | Weather options staff can set |
| `GameView` | Live screen viewing over WebRTC |
| `Scheduler` | Scheduled/automatic tasks |
| `DevTools` | Developer tools inside the panel |
| `Browser` / `Web` | Browser panel and cloud connection |
| `UI` | Branding, colours and layout |

## Sections in config_server.lua

| Section | What it controls |
|---|---|
| `Discord` | Webhooks per log category — see [Discord logs](/discord) |
| `DiscordRoles` | Map Discord roles to panel groups |
| `Compat` | Old event names for other scripts |
| `Integrations.Housing.list` / `.stash` | Your own housing queries |
| `Permissions.CustomFunction` | Your own staff check |
| `Duty.Check` | Your own duty check |

::: tip config_server.lua is server-only
Players can never read this file, so Discord tokens and webhooks are safe there.
:::

## Branding

```lua
Config.UI = {
    Brand = 'YOUR SERVER',
    BrandSub = 'Admin Panel',
}
```

Staff can pick their own theme, accent colour, density and layout from the
panel's **Settings** page — those are personal preferences, not server config.
