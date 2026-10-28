# Troubleshooting

::: tip Start here
Run **`panellink`** in your server console. It runs a full setup check and
reports what is wrong before you go looking yourself.
:::

## Startup messages

| Message | What it means | What to do |
|---|---|---|
| `loaded 46 server files from the cloud` | Everything is fine | Nothing |
| `no active license` | Licence missing, wrong or revoked | Check `arp_panel_license` in `server.cfg` |
| `license already in use on another server` | The licence is bound to a different server | Contact support to unbind it |
| `cloud unreachable` | Your server cannot reach the licence cloud | Check firewall / outbound internet. It retries automatically |
| `cloud rejected the server key` | The stored server key was not accepted | Run `panellink reset confirm`, then restart |
| `script is outdated` | Your version is below the minimum | Update to the latest release |
| `could not verify delivered code` | The downloaded code failed its signature check | Restart once; if it persists, contact support |

## The panel will not open in game

**You are probably not staff yet.** From the console:

```
setstaff 1 owner
```

Also check:
- Are you on duty? If `Config.Duty.Mode` requires duty, use `/staffduty`
- Did the key get rebound? Check *GTA Settings → Key Bindings → FiveM*
- Try the command `/adminpanel` instead of the key

## The panel opens but stays empty

Your server could not load its code. Look in the console for the
`loaded ... server files` line and check the table above.

## No players show up

- Is `Config.Framework` correct? It is `'auto'` by default; set it explicitly if
  detection picks the wrong framework
- Is `oxmysql` started **before** the panel?
- Did you import `sql/install.sql`?

## Items have no pictures

Set `Config.ItemImages`. With `'auto'` it uses your inventory's image folder.
Point it at a resource and folder if your setup differs. Use
`Config.HideItemsWithoutImage = true` to hide items that have no picture.

## Browser panel will not load

- Run `panellink` to confirm your server is online and get the correct address
- A staff member needs a login: `createlogin [server id]`
- Forgot the password? `resetlogin [username]`

## Discord logs are not arriving

- Is `Config.Discord.Enabled = true` in `config_server.lua`?
- Is a webhook filled in under `Webhooks.default`?
- Is the category you expect set to `true` under `Log`?

## Still stuck?

Collect this before contacting support:

1. The full console output from server start, including the loader line
2. The output of `panellink`
3. Your framework and whether you changed `config.lua`
