---
description: "Configure staff groups and permissions using ESX, QBCore, ace permissions, Discord roles or your own staff script."
---

# Staff & permissions

Two things decide what someone may do: **where their group comes from**, and
**what that group is allowed**.

## Where staff come from

`Config.Permissions.GroupSource` in `config.lua`:

| Source | Staff are recognised by |
|---|---|
| `'builtin'` | The panel's own staff list (`setstaff` and the Staff page) |
| `'framework'` | ESX group or QBCore permission |
| `'ace'` | An ace permission: `adminpanel.group.<name>` |
| `'discord'` | Discord roles — configure in `config_server.lua` |
| `'custom'` | Your own staff script |

You can combine them. The **highest rank wins**:

```lua
GroupSource = { 'builtin', 'discord', 'framework' }
```

### Renaming groups

If your framework uses different names, map them onto panel groups:

```lua
GroupMap = { superadmin = 'owner', god = 'owner', mod = 'moderator' },
```

The defaults already cover ESX (`superadmin`, `admin`) and QBCore/Qbox
(`god`, `admin`, `mod`).

### Your own staff script

```lua
Custom = { type = 'export', resource = 'my_staff_script', name = 'GetStaffGroup' },
```

The export receives the server ID and returns a group name, a list of names, or
`nil`. Prefer Lua? Set `type = 'function'` and write
`Config.Permissions.CustomFunction` in `config_server.lua`.

## Groups

Groups are defined in `Config.AdminGroups`. Each has a **rank** (higher = more
senior), a label, a colour, and its permissions.

```lua
moderator = {
    rank = 2,
    label = 'Moderator',
    color = '#2ecc71',
    inherits = 'helper',
    permissions = {
        'player.kick', 'player.warn', 'player.freeze',
    },
},
```

`inherits` pulls in everything from another group, so you only list what you add
on top.

::: tip Staff can only promote below themselves
With `OnlyLowerRanks = true`, a moderator can never hand out admin. Owner groups
are listed in `OwnerGroups`.
:::

## Owners

```lua
OwnerGroups = { 'owner' },
```

Owners may use `createlogin`, `resetlogin`, `setstaff` and `panellink`, and may
assign any group.

## Single permissions through ace

With `UseAce = true` you can grant one specific permission without a group:

```
add_ace identifier.license:abc adminpanel.player.ban allow
```

`adminpanel.all` grants everything.

## Duty

`Config.Duty.Mode` decides whether staff must be on duty to use the panel:

| Mode | Meaning |
|---|---|
| `'none'` | Always on duty |
| `'builtin'` | Toggle with `/staffduty` |
| `'job'` | Based on their framework job |
| `'statebag'` | `Player(source).state[StateKey] == true` |
| `'export'` / `'client_export'` | Your own export returns true |
| `'external'` | Your duty script calls `exports['arp-adminpanel']:SetDuty(source, true)` |
| `'function'` | `Config.Duty.Check(source)` in `config_server.lua` |
