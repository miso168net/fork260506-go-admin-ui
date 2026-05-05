---
type: "query"
date: "2026-05-05T18:52:53.075613+00:00"
question: "Are getList() 6 INFERRED edges actually correct?"
contributor: "graphify"
source_nodes: ["getList", "listConfig", "listPost", "addDateRange"]
---

# Q: Are getList() 6 INFERRED edges actually correct?

## Answer

All 6 INFERRED edges verified TRUE by grep. The top getList() variant lives in sys-post/index.vue but is the merged graph node for getList() across admin modules. Verified call sites: sys-config/index.vue:276 calls listConfig(); sys-login-log/index.vue:198 calls listSysLoginlog(); sys-oper-log/index.vue:237 calls listSysOperlog(); sys-post/index.vue:223 calls listPost(); plus dict and importTable use listType/addDateRange. addDateRange is from utils/costum.js and IS used by every getList wrapper. Pattern: every admin CRUD page has a getList() that calls list<Entity>(addDateRange(queryParams, dateRange)). The INFERRED edges captured this faithfully — extractor cannot prove the call without scope analysis, but pattern is correct.

## Source Nodes

- getList
- listConfig
- listPost
- addDateRange