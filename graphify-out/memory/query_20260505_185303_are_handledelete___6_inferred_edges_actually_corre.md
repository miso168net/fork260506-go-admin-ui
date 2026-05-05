---
type: "query"
date: "2026-05-05T18:53:03.353941+00:00"
question: "Are handleDelete() 6 INFERRED edges actually correct?"
contributor: "graphify"
source_nodes: ["handleDelete", "delConfig", "delPost"]
---

# Q: Are handleDelete() 6 INFERRED edges actually correct?

## Answer

All 6 INFERRED edges follow the same admin CRUD pattern as getList(). handleDelete() in sys-config/sys-login-log/sys-oper-log/sys-post/dict-type/dev-tools-gen index.vue calls del<Entity>() from the matching api/admin/*.js or api/tools/gen.js (delConfig, delSysLoginlog, delSysOperlog, delPost, delType, delTable). Edges are correct in spirit even though the AST extractor cannot prove cross-file resolution. Same structural template as getList(): each admin page imports the API module, defines handleDelete(row), confirms via , then calls the matching del<Entity>(id) and refreshes via getList().

## Source Nodes

- handleDelete
- delConfig
- delPost