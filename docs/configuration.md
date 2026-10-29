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

## Set these first

The panel ships with neutral defaults, so there are only a few things you have
to fill in before it is yours.

```lua
Config.Web.Cloud.License = ''          -- your licence key, or set it in server.cfg
Config.UI.Brand          = 'My Server' -- your server name in the sidebar
Config.Locale            = 'en'        -- 'en' | 'nl' | 'de' | 'fr' | 'es'
```

Everything else already works. Run `panellink` in the server console afterwards
for a setup check.

::: tip Keep your licence out of config.lua
`set arp_panel_license "ARP-XXXXX-XXXXX-XXXXX-XXXXX"` in `server.cfg` keeps the
key out of the files you share with developers. See [Licence](/licence).
:::

## The basics

```lua
Config.Locale    = 'en'     -- 'en' | 'nl' | 'de' | 'fr' | 'es'
Config.Framework = 'auto'   -- 'auto' | 'esx' | 'qbcore' | 'qbox'
Config.Inventory = 'auto'   -- 'auto' | 'ox_inventory' | 'qb-inventory' | 'qs-inventory' | 'framework' | 'custom'
Config.Debug     = false
```

`'auto'` detects what you run. Set it explicitly only if detection is wrong.

::: tip Something not working?
Set `Config.Debug = true` and restart. The console then says which framework,
inventory and staff source were detected, and why a lookup failed.
:::

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
    Brand    = 'My Server',     -- name in the sidebar and on the login screen
    BrandSub = 'Admin Panel',   -- the smaller line under it
    Logo     = 'logo.png',      -- a file in html/, or an https:// link
    Accent   = '#2f7fe0',       -- highlight colour
}
```

Replace `html/logo.png` with your own image. An animated `.gif` works too: drop
it in `html/` and set `Logo = 'logo.gif'`.

Staff can pick their own theme, accent colour, density and layout from the
panel's **Settings** page — those are personal preferences, not server config.
