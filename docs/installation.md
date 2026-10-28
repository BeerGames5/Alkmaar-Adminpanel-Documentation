---
description: "How to install the Alkmaar Admin Panel on your FiveM server: requirements, database import, licence setup and first use."
---

# Installation

## Requirements

| Dependency | Required |
|---|---|
| [oxmysql](https://github.com/overextended/oxmysql) | Yes |
| [ox_lib](https://github.com/overextended/ox_lib) | Yes |
| assetpacks | Yes |
| MySQL / MariaDB database | Yes |
| ESX, QBCore or Qbox | Optional — runs standalone too |

::: warning Outbound internet required
The panel loads its server code from the licence cloud when your server starts.
If your host blocks outbound connections, the panel will not start.
:::

## Step 1 — Add the resource

Place the `arp-adminpanel` folder in your `resources` directory.

## Step 2 — Import the database

Import `sql/install.sql` into your server's database.

## Step 3 — Add your licence

Open `server.cfg` and add your licence. **Either format works** — the key from
your purchase, or your Tebex transaction ID:

```ini
set arp_panel_license "ARP-XXXXX-XXXXX-XXXXX-XXXXX"
```

```ini
set arp_panel_license "tbx-your-transaction-id"
```

::: tip Where do I find this?
Your Tebex confirmation email contains your transaction ID. You can use that
directly — there is nothing else to activate.
:::

## Step 4 — Start it

Make sure the resource starts **after** its dependencies:

```ini
ensure oxmysql
ensure ox_lib
ensure arp-adminpanel
```

## Step 5 — Restart and check

Restart your server. The console should show:

```
[arp-adminpanel loader] loaded 46 server files from the cloud.
```

That line means your licence is valid and the panel is ready. If you see
something else, check [troubleshooting](/troubleshooting).

## Step 6 — Make yourself staff

From the server console, or in game as owner:

```
setstaff 1 owner
```

Replace `1` with your server ID. Now press **F6** in game, or type
`/adminpanel`.

::: tip Changing the key
Players can rebind it themselves in *GTA Settings → Key Bindings → FiveM*. To
change the default, edit `Config.Commands.OpenKey` in `config.lua`.
:::

## Step 7 — Browser panel (optional)

Run `panellink` in the server console. It prints your private panel address and
runs a setup check. See [browser panel](/browser-panel) for giving staff access.

## Updating

1. Stop the resource
2. Replace the files, but **keep your own `config.lua` and `config_server.lua`**
3. Start the resource again

Your settings live in those two files, so they are the only ones you need to
carry over.
