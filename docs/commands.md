# Commands

All command names can be renamed in `Config.Commands` in `config.lua`. Set one
to `false` to disable it.

## For everyone

| Command | What it does |
|---|---|
| `/report` | Opens the report window so players can contact staff |
| `/claimrefund` | Claims a refund that staff created for the player |

## For staff

| Command | What it does |
|---|---|
| `/adminpanel` | Opens the admin panel (default key **F6**) |
| `/staffduty` | Toggles duty, when `Config.Duty.Mode = 'builtin'` |

## For owners and console

| Command | What it does |
|---|---|
| `setstaff [id] [group]` | Adds a staff member. `[id]` is a server ID or licence identifier, `[group]` a group from `Config.AdminGroups` |
| `createlogin [id]` | Creates a browser-panel login for a staff member |
| `resetlogin [username]` | Gives a staff member a new browser password |
| `panellink` | Shows the browser panel link and runs the setup check |
| `panellink reset confirm` | Generates a new server key (console only) |

## Examples

Make a player with server ID 4 an administrator:

```
setstaff 4 admin
```

Give them browser access:

```
createlogin 4
```

Check your setup and get your panel link:

```
panellink
```

::: tip Run panellink first
If anything is not working, `panellink` reports what is missing before you start
digging through config files.
:::

## Changing the open key

`Config.Commands.OpenKey` sets the default (F6). Players can rebind it
themselves in *GTA Settings → Key Bindings → FiveM*.

```lua
Config.Commands = {
    OpenPanel = 'adminpanel',
    OpenKey   = 'F6',
}
```
