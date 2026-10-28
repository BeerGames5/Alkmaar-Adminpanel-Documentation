# Browser panel

The same panel, reachable from any browser. Handy for dealing with a report
from your phone without joining the server.

## Getting your link

Run this in the server console:

```
panellink
```

It prints your private panel address and runs a setup check. Every server gets
its own address — nobody can reach yours without it.

## Giving staff access

In-game staff use F6 and need no account. Browser access needs a login:

```
createlogin 4
```

Replace `4` with the player's server ID. The command creates a username and
password for them.

Forgot a password?

```
resetlogin theirusername
```

Both commands are owner-only.

## Turning it off

```lua
Config.Web = {
    Cloud = {
        Enabled = false,
    },
}
```

The in-game panel keeps working.

::: warning Your licence still needs the connection
Turning off the browser panel does not make the panel work offline — the server
code is still loaded from the cloud at startup.
:::

## Item pictures

The browser panel shows item images from your inventory resource:

```lua
Config.ItemImages = 'auto'
```

`'auto'` uses your inventory's image folder. Point it at a resource and folder
if your setup differs, or set it to `''` to show none.

## Is it safe?

- Every server has its own private address
- Browser access requires a login you create yourself
- Staff only see what their group allows, exactly as in game
