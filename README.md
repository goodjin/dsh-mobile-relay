# @goodjin2/dsh-mobile-relay

[English](README.md) | [中文](README.zh.md)

A [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) plugin for mobile access through a cloud relay: your phone reaches one public HTTPS entry, and the relay switches you between your registered machines over SSH local tunnels — no Tailscale needed on the phone.

This package also carries the mobile page itself (formerly `@threadharbor/dsh-mobile-entry`): the static single-page app, the pair-url / peers routes, and the protocol constants shared with the page.

## What it does

- **Cloud relay host** — public HTTPS entry (`dsh.agentlab.fun`-style: DNS + Let's Encrypt + nginx reverse proxy + one HTTP password layer)
- **Machine registry** — which machines the relay can switch to, per-machine session forwarding, approvals and event streams merged by machine ownership
- **SSH local tunnels** — the data plane; the tailnet is only used for online discovery
- **Mobile page** — static assets served at `/threadharbor/mobile`, with pair-url / peers routes; machine list, per-machine session list, approval banners
- **Setup snippet** — `scripts/relay-setup.sh` prints the profile configuration (never writes files)

## Install

From GitHub Packages:

```sh
# Set up auth (one-time)
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
echo "@goodjin:registry=https://npm.pkg.github.com" >> ~/.npmrc
```

Or add to your profile's `package.json`:

```json
{
  "dependencies": { "@goodjin2/dsh-mobile-relay": "^0.1.0" }
}
```

And mount it in your profile's `cordis.patch.yml`:

```yaml
- id: threadharbor-mobile-relay
  name: '@goodjin2/dsh-mobile-relay'
```

## Dependencies

- `@goodjin2/dsh-host-federation` — SSH manager, Tailscale discovery, shared types (currently resolved via a local `file:` link to the threadharbor checkout; will move to its own published package)

## Requirements

- DSH ≥ 0.2.1-rc.2, Node ≥ 22.19 (or ≥ 24)
- A cloud host with nginx and a domain for the public entry
- `tailscale` on the relay host (online discovery only)

## License

MIT


## Version anchor tags

This repo participates in the container's DSH version-correspondence mechanism: every
plugin repo carries tags named `dsh-<dsh版本>` (e.g. `dsh-0.2.2-rc.1`), each an annotated
tag recording the dsh version it was verified against, the check result, and the date.
The tag is the immutable "known-good coordinate" of that dsh version — a snapshot of
`main` taken the moment the whole-plugin row check went green on every installed host.

- **Why tags instead of releases**: the desktop app reads this checkout by path and the
  web install pulls `repo#ref` — a git tag is already the furthest installable form, so
  no npm publish or GitHub Release is needed.
- **Rollback**: `scripts/pin-to-dsh.sh 0.2.2-rc.1` (from the container) checks out the
  tag in every repo at once; `scripts/check-host-rows.mjs --report` shows which repos are
  on the anchor for the running dsh version.
- **Do not move or delete a `dsh-*` tag**; it is a rollback coordinate. A follow-up fix on
  the same dsh version adds a `-p2` (then `-p3`) suffixed tag instead.
- New tags are cut after each dsh upgrade, as step 4 of the upgrade runbook — see the
  container's `AGENTS.md` for the full flow.
