---
description: "How licensing works: licence formats, server binding, moving to another server, refunds and offline behaviour."
---

# Licence

## How it works

1. You buy the panel on Tebex
2. A licence is created for your purchase
3. You put it in `server.cfg` as `arp_panel_license`
4. On startup your server asks the cloud for its code — the cloud checks your
   licence and sends it
5. The licence **binds to the first server that uses it**

Because the panel's server code is delivered at startup, a valid licence is
required every time your server boots.

## What counts as a licence

Both of these work in `server.cfg`:

| Format | Example |
|---|---|
| Licence key | `ARP-XXXXX-XXXXX-XXXXX-XXXXX` |
| Tebex transaction ID | `tbx-abc123...` |

```ini
set arp_panel_license "tbx-abc123..."
```

## One licence, one server

The first server to start with your licence claims it. After that the same
licence will be refused elsewhere with:

```
no active license: license_bound
```

This is intentional — it stops your licence from being shared.

## Moving to another server

Changing host or hardware? Contact support to unbind your licence, then start
the resource on the new machine. It will bind itself again automatically.

::: tip Did you only move the database?
If you kept your database but your server lost its stored key, the first boot
can fail with `license_bound`. Simply restart once more — it repairs itself.
:::

## Refunds and chargebacks

A refunded or charged-back purchase revokes the licence automatically. The panel
stops working on the next startup.

## Offline behaviour

If the cloud is briefly unreachable, a server that is already running keeps
working for a while, and the loader keeps retrying in the background. A server
that is restarting during an outage cannot load its code until the connection
returns.
