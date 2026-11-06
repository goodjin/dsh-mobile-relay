# @goodjin2/dsh-mobile-relay

[English](README.md) | [中文](README.zh.md)

一个 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 插件：手机经云主机中转访问你的开发机——手机只连一台公网 HTTPS 入口，中转站用 SSH 本地隧道在多台登记机器之间切换，手机端不用装 Tailscale。

本包同时携带手机页本体（原 `@threadharbor/dsh-mobile-entry`）：静态单页应用、pair-url / peers 路由、与页面共享的协议常量。

## 功能

- **云中转入口** — 公网 HTTPS 入口（灰云 DNS + Let's Encrypt + nginx 反代 + 一层 HTTP 口令）
- **机器登记簿** — 中转可切换哪些机器、按机器归属的会话转发、审批与事件汇流
- **SSH 本地隧道** — 数据面走 SSH；tailnet 只做在线发现
- **手机页** — `/threadharbor/mobile` 下的静态资源与 pair-url / peers 路由；机器清单、单机会话列表、待批横幅
- **配置片段** — `scripts/relay-setup.sh` 打印 profile 配置（只打印，不改文件）

## 安装

从 GitHub Packages：

```sh
# 一次性授权
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
echo "@goodjin:registry=https://npm.pkg.github.com" >> ~/.npmrc
```

或在 profile 的 `package.json` 里加：

```json
{
  "dependencies": { "@goodjin2/dsh-mobile-relay": "^0.1.0" }
}
```

并在 profile 的 `cordis.patch.yml` 挂载：

```yaml
- id: threadharbor-mobile-relay
  name: '@goodjin2/dsh-mobile-relay'
```

## 依赖

- `@goodjin2/dsh-host-federation` — SSH 管理器、Tailscale 发现、共享类型（当前以本地 `file:` 链接解析到 threadharbor checkout；后续随其独立发布切换为正式包）

## 要求

- DSH ≥ 0.2.1-rc.2，Node ≥ 22.19（或 ≥ 24）
- 一台有 nginx 和域名的云主机作公网入口
- 中转机上装 `tailscale`（仅在线发现）

## 许可证

MIT


## 版本锚点标签

本仓库参与容器里的 dsh 版本对应机制：每个插件仓库都有形如 `dsh-<dsh版本>`（如
`dsh-0.2.2-rc.1`）的标签，都是附注标签，记录它验证过的 dsh 版本、核查结论与日期。
标签是该 dsh 版本的「已知可用坐标」——整插件声明行核查在全部宿主上变绿的那一刻，
`main` 的快照。

- **用标签而不是发版**：桌面版直接按路径读这份 checkout，web 安装走 `仓库#引用`——
  标签已经是可安装的最远形态，不需要 npm 发布或 GitHub Release。
- **回退**：在容器里跑 `scripts/pin-to-dsh.sh 0.2.2-rc.1` 一条命令把所有仓库退回该标签；
  `scripts/check-host-rows.mjs --report` 显示当前 dsh 版本下各仓在不在锚点上。
- **不要移动或删除 `dsh-*` 标签**：它是回退坐标。同一个 dsh 版本上后续修复加 `-p2`、
  然后 `-p3` 后缀的标签，不动原标签。
- 新标签在每次 dsh 升级后按升级流程的第四步打——完整流程见容器的 `AGENTS.md`。
