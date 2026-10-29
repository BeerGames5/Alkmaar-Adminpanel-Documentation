---
description: "Connect the panel to your framework, inventory, housing, jail, keys and notification scripts, with ready-made examples for ESX, QBCore, ox_lib and your own resources."
---

# Integrations

The panel detects your framework and inventory on its own. Everything on this
page is for the rest: the scripts it cannot guess, and the ones you wrote
yourself.

## Framework and inventory

```lua
Config.Framework = 'auto'   -- 'auto' | 'esx' | 'qbcore' | 'qbox' | 'none'
Config.Inventory = 'auto'   -- 'auto' | 'ox_inventory' | 'qb-inventory' | 'qs-inventory' | 'framework' | 'custom'
Config.Job2      = 'none'   -- 'none' | 'esx_job2' | 'qb_gang'
```

`'auto'` detects `es_extended`, `qbx_core` or `qb-core`. Set it explicitly only
when you run a renamed or forked core that detection does not recognise.

`'none'` is what detection falls back to when it finds no framework. The panel
still runs: players are found through FiveM itself, so moderation, bans, logs,
tickets and the map all work. Jobs, money and inventory are empty, because there
is nothing to read them from.

::: warning
On a framework server this almost always means detection failed rather than that
you meant it. The panel prints a red line on start when it lands on `'none'`, so
check your console if jobs and money are suddenly missing.
:::

`Config.Job2` adds a second job column to the player file. With `'esx_job2'` you
also need the `Job2` and `Job2Grade` columns set in `Config.Database.Users`.

## A custom inventory

Running something not in the list?

```lua
Config.Inventory = 'custom'
```

Then fill in `bridge/inventory/custom.lua`. That file ships uncompiled with a
comment above each function explaining what to return, and it is **never
overwritten by an update**.

## Money accounts

The name on the left is what the panel calls it, the name on the right is the
account name in your framework. Set one to `false` and it disappears from the
panel.

```lua
-- ESX (default)
Config.Accounts = { money = 'money', bank = 'bank', black_money = 'black_money' }

-- QBCore / Qbox
Config.Accounts = { money = 'cash', bank = 'bank', black_money = false }
```

## Database names

Only needed when your tables or columns differ from the defaults. Any column set
to `false` is left out of the panel instead of breaking it.

```lua
Config.Database = {
    Users = {
        Table       = 'users',
        Identifier  = 'identifier',
        DateOfBirth = 'birthdate',   -- yours is named differently
        Height      = false,         -- you do not have this column
    },
}
```

Owned vehicles are the one table that varies most, so `Table = 'auto'` picks the
standard layout for your framework. Point it at your own table to use the
columns below it instead:

```lua
Vehicles = {
    Table  = 'garage_cars',
    Owner  = 'steamid',
    Plate  = 'numberplate',
    Props  = 'props',
    Model  = 'modelname',
    Stored = 'in_garage',
    Type   = false,
},
```

## Config.Integrations

This is how the panel talks to every other script. Each entry takes the same
shape, so once you understand one you understand all of them.

| `type` | What it does |
|---|---|
| `'builtin'` | The panel handles it itself |
| `'none'` | Turn it off — the button disappears where there is one |
| `'export'` | `exports[resource][name](args...)` |
| `'event'` | `TriggerEvent(name, args...)`, on the side it already runs |
| `'function'` | `fn = function(ctx) ... end`, written in the config |

Two more depend on **which side the integration runs on**, because they are the
only way to reach the other side:

| Runs on | Extra type |
|---|---|
| a client integration | `'server_event'` → `TriggerServerEvent(name, args...)` |
| a server integration | `'client_event'` → `TriggerClientEvent(name, target, args...)` |

::: warning Pick the one that matches the side
A client integration cannot take `client_event`, and a server one cannot take
`server_event`. It does not crash: the console prints *"Integration type … is not
supported here"* and the panel falls back to its own behaviour, which is easy to
miss. The table below says which side each one runs on.

On a client integration, `'event'` already fires a client event — that is what
most notification and menu scripts want.
:::

Each integration has its own values, and you place them yourself with `{braces}`:

```lua
args = { '{message}', '{duration}' }
```

Order matters: the values are handed over in the order you write them. Anything
you leave out is simply not passed on, and `args` may hold tables too, which is
how options-object APIs like `ox_lib` are called.

### What each one gets

| Integration | Runs on | Values |
|---|---|---|
| `Notify` | player's client | `message` `type` `duration` `title` |
| `Announcement` | every client | `message` `author` `title` `duration` |
| `Revive` | server | `target` `admin` |
| `Heal` | server | `target` `admin` |
| `Teleport` | player's client | `coords` `x` `y` `z` `heading` `groundSnap` |
| `AdminMode` | staff client | `mode` `enabled` |
| `Clothing` | player's client | — |
| `Needs` | server | — |
| `Weather` | server | `weather` `freeze` |
| `VehicleKeys` | staff client | `plate` `vehicle` `model` `netId` |
| `GiveKeys` | player's client | `plate` `vehicle` `model` `netId` |
| `Jail` | server | `target` `minutes` `reason` `admin` |
| `Unjail` | server | `target` `admin` |
| `Cuff` | player's client | `cuffed` |

`Notify.type` is one of `success`, `error` or `info`.

### Notifications

```lua
-- ox_lib
Notify = {
    type = 'export', resource = 'ox_lib', name = 'notify',
    args = { { description = '{message}', type = '{type}', duration = '{duration}' } },
},

-- ESX  (Notify runs on the client, so 'event' is already a client event)
Notify = { type = 'event', name = 'esx:showNotification', args = { '{message}' } },

-- QBCore
Notify = { type = 'event', name = 'QBCore:Notify', args = { '{message}', '{type}', '{duration}' } },

-- your own script
Notify = {
    type = 'export', resource = 'my-notify', name = 'Show',
    args = { '{title}', '{message}', '{type}' },
},
```

### Revive and heal

```lua
Revive = { type = 'client_event', name = 'esx_ambulancejob:revive' },      -- ESX
Revive = { type = 'client_event', name = 'hospital:client:Revive' },       -- QBCore
Heal   = { type = 'client_event', name = 'esx_basicneeds:healPlayer' },    -- ESX
```

Revive and Heal run on the server, which is why `client_event` is the right type
here. `'builtin'` already restores health, armour, hunger and thirst. Only replace it
when your medical script needs to know as well, for example to clear a death
state of its own.

### Vehicle keys

```lua
-- qb-vehiclekeys
VehicleKeys = {
    type = 'server_event', name = 'qb-vehiclekeys:server:AcquireVehicleKeys',
    args = { '{plate}' },
},

-- wasabi_carlock
VehicleKeys = { type = 'export', resource = 'wasabi_carlock', name = 'GiveKey', args = { '{plate}' } },
```

`GiveKeys` is for keys handed to a player from the panel. Leave it on `'same'`
to reuse whatever `VehicleKeys` does.

### Jail

```lua
-- qb-policejob
Jail = { type = 'client_event', name = 'police:client:SendToJail', args = { '{minutes}' } },

-- your own script
Jail = {
    type = 'export', resource = 'my-jail', name = 'Jail',
    args = { '{target}', '{minutes}', '{reason}' },
},
```

Leave `type = 'none'` and the jail button is hidden instead of failing. Jail and
Unjail take `client_event` but not `'builtin'` — the panel has no jail of its own.

### Clothing

```lua
Clothing = { type = 'auto' },   -- finds illenium-appearance, fivem-appearance, qb-clothing or esx_skin
Clothing = { type = 'event', name = 'illenium-appearance:client:openMenu' },
Clothing = { type = 'none' },   -- hide the button
```

### Anticheat

`AdminMode` fires whenever a staff member turns noclip, godmode or invisibility
on or off. Use it to tell your anticheat to leave them alone:

```lua
AdminMode = {
    type = 'server_event', name = 'my-anticheat:staffMode',
    args = { '{mode}', '{enabled}' },
},
```

The other direction works through an export — your anticheat reports to the
panel and the detection appears on the Anticheat page:

```lua
exports['arp-adminpanel']:AddDetection(source, 'Speedhack', 'Speed 180 in a Blista', 'high')
```

The last argument is `'low'`, `'medium'` or `'high'`.

### Weather

```lua
Weather = { type = 'event', name = 'my-weather:set', args = { '{weather}', '{freeze}' } },
```

Weather is the one integration that takes no `client_event`. Fire your own server
event and let your weather script tell its own clients.

::: warning
Leave this on `'none'` when a weather sync script already owns the weather, or
the two will fight each other.
:::

## Housing

Housing scripts vary too much to detect, so you write two small functions in
`config_server.lua` and set `Config.Integrations.Housing.type = 'function'`.

`list` gets the player's identifier and returns their properties. Only `id` and
`name` are required; the rest is shown when present.

```lua
Config.Integrations.Housing.list = function(identifier)
    local rows = MySQL.query.await(
        'SELECT id, property_id, price_paid, type, purchase_date FROM player_properties WHERE owner = ?',
        { identifier }
    ) or {}
    local properties = {}
    for _, row in ipairs(rows) do
        properties[#properties + 1] = {
            id          = row.id,
            property_id = row.property_id,
            name        = ('Property %s'):format(row.property_id),
            price       = row.price_paid or 0,
        }
    end
    return properties
end
```

If your housing script has an export, call that instead:

```lua
Config.Integrations.Housing.list = function(identifier)
    return exports['my-housing']:GetProperties(identifier)
end
```

`stash` returns the stash ids of those properties. The first is shown; all of
them are searched when staff remove an item.

```lua
Config.Integrations.Housing.stash = function(identifier)
    local id = identifier:gsub(':', '_')
    return { 'player_' .. id .. '_apartment_stash', 'property_' .. id }
end
```

::: tip Finding your stash ids
Look in your inventory's own stash table — the `ox_inventory` table for
ox_inventory, `inventories` for qb-inventory — and copy the naming you see
there.
:::

## Your own staff list

With `Config.Permissions.GroupSource = 'custom'` the panel asks your script who
is staff. Through an export:

```lua
-- config.lua
Custom = { type = 'export', resource = 'my_staff_script', name = 'GetStaffGroup' }

-- in your own resource
exports('GetStaffGroup', function(source)
    local rank = MyStaffSystem.GetRank(source)
    if rank == 3 then return 'admin' end
    if rank == 2 then return 'moderator' end
    return nil
end)
```

Or without a second resource, with `type = 'function'`:

```lua
-- config_server.lua
Config.Permissions.CustomFunction = function(ctx)
    local row = MySQL.single.await('SELECT rank FROM my_staff WHERE license = ?', { ctx.license })
    if not row then return nil end
    return row.rank >= 4 and 'admin' or 'moderator'
end
```

`ctx` holds `source` (0 when offline), `identifier` and `license`. Return a group
name from `Config.AdminGroups`, a list of names, or `nil` for "not staff".

::: tip Combine sources
`GroupSource` also takes a list, and the highest rank found wins:
`GroupSource = { 'builtin', 'discord', 'framework' }`. That lets you hand out a
rank in Discord, override it per person in the panel, and still fall back on the
framework group.
:::

## Your own duty script

See [Staff & permissions](/permissions#duty) for every mode. The two that talk to
another script:

```lua
-- your script answers when asked
Config.Duty.Mode   = 'client_export'
Config.Duty.Export = { resource = 'my-duty-script', name = 'IsOnDuty' }

-- or your script tells the panel instead
Config.Duty.Mode = 'external'
-- and in your script:
exports['arp-adminpanel']:SetDuty(source, true)
```

::: warning Nobody can open the panel?
With `Config.Duty.Required = true`, a duty check that never returns true locks
everyone out. Set `Config.Duty.Mode = 'none'` to rule the duty check out first.
:::

## Older scripts

If another resource still calls old event names:

```lua
Config.Compat = {
    EsxReports        = false,   -- esx_reports:submitReport and esx_reports:isStaff
    ApartmentsStash   = false,   -- apartments:getStashItems
    TeleportSafeEvent = false,   -- admin-panel:setTeleportSafe
}
```

Turn on only what you actually need; leaving them off keeps the surface small.

## Exports you can use

```lua
-- log a staff action from your own script
exports['arp-adminpanel']:AddStaffLog(actionType, targetName, targetId, description, extra)

-- report a cheat detection to the Anticheat page
exports['arp-adminpanel']:AddDetection(source, kind, details, 'low')

-- tell the panel someone went on or off duty (Config.Duty.Mode = 'external')
exports['arp-adminpanel']:SetDuty(source, true)
```
