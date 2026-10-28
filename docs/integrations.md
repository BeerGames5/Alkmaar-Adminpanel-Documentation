# Integrations

The panel detects your framework and inventory automatically. These settings are
only needed when you run something it does not know.

## Framework and inventory

```lua
Config.Framework = 'auto'   -- auto, esx, qb, qbox, none
Config.Inventory = 'auto'   -- auto, ox, qb, qs, custom
Config.Job2 = 'none'        -- second job system, if you use one
```

Set them explicitly only if detection picks the wrong one.

## A custom inventory

Running something not in the list? Set:

```lua
Config.Inventory = 'custom'
```

and fill in `bridge/inventory/custom.lua`. That file ships uncompiled with
comments explaining each function, and it is **never overwritten by updates**.

## Money accounts

```lua
Config.Accounts = {
    cash = 'Cash',
    bank = 'Bank',
}
```

Add your own accounts here so they show up in the economy tools.

## Database names

If your tables or columns differ from the defaults, map them in
`Config.Database`. The comments in the file name each one.

```lua
Config.Database = {
    License = 'license',   -- set to false if you do not have this column
}
```

## Housing

Housing scripts vary too much to detect, so you write two small queries in
`config_server.lua`:

```lua
Config.Integrations.Housing.list = function(identifier)
    local rows = MySQL.query.await(
        'SELECT id, property_id, price_paid, type, purchase_date FROM player_properties WHERE owner = ?',
        { identifier }
    ) or {}
    -- return a list of properties
end

Config.Integrations.Housing.stash = function(identifier)
    local id = identifier:gsub(':', '_')
    return { 'player_' .. id .. '_apartment_stash' }
end
```

Set `Config.Integrations.Housing.type = 'function'` to use them.

## Older scripts

If another resource still calls old event names:

```lua
Config.Compat = {
    EsxReports        = false,
    ApartmentsStash   = false,
    TeleportSafeEvent = false,
}
```

Turn on only what you actually need.

## Exports you can use

Log a staff action from your own script:

```lua
exports['arp-adminpanel']:AddStaffLog(actionType, targetName, targetId, description, extra)
```

Tell the panel someone went on or off duty (with `Config.Duty.Mode = 'external'`):

```lua
exports['arp-adminpanel']:SetDuty(source, true)
```
