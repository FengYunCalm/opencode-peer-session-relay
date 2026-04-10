## graphify

本项目维护 `graphify-out/` 作为知识图谱知识库。它把模块结构、依赖路径、设计理由压缩成可导航摘要，比直接盲搜原始文件更稳定，也更节省上下文。

Rules:
- 在回答架构、模块关系、代码库结构、依赖路径这类问题前，先读 `graphify-out/GRAPH_REPORT.md`；如果图谱已足够，不要先盲搜原始文件。
- 如果 `graphify-out/wiki/index.md` 存在，优先沿 wiki 导航；只有 graphify 信息不足时，才回退到原始文件搜索。
- 如果用户的问题是“解释、关系链、路径、某模块如何连到另一模块、某概念代表什么”，优先使用 `/graphify query`、`/graphify path`、`/graphify explain`，再回退到 Grep/Read。
- 区分职责：`/graphify ...` 是助手侧 command/skill，用于构图与查询；`graphify install`、`graphify opencode install`、`graphify hook install` 是本地 CLI/部署命令，不用于回答代码语义问题。
- 本项目若需要持续自动维护 graphify，默认使用独立终端运行 `python -m graphify.watch . --debounce 3`；当前环境若已启用 `GraphifyWatchPeerRelay` WinSW 服务，也可把它视为等价的持续 watch。
- 若当前会话已确认有独立终端在运行 `graphify.watch`，或 `GraphifyWatchPeerRelay` 服务处于运行状态，代码改动默认由它自动刷新 `graphify-out/`；汇报前只需要检查产物是否已更新。
- 若当前会话没有运行 `graphify.watch`，代码改动后再执行 `python -c "from graphify.watch import _rebuild_code; from pathlib import Path; _rebuild_code(Path('.'))"`；若改的是文档、图片、PDF 等非代码内容，则改用 `/graphify --update`。
