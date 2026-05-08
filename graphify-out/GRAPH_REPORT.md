# Graph Report - .  (2026-05-08)

## Corpus Check
- Large corpus: 418 files · ~106,431 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 991 nodes · 1039 edges · 219 communities (177 shown, 42 thin omitted)
- Extraction: 75% EXTRACTED · 25% INFERRED · 0% AMBIGUOUS · INFERRED: 259 edges (avg confidence: 0.75)
- Token cost: 70,000 input · 13,494 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Utility Functions|Utility Functions]]
- [[_COMMUNITY_Excel Export Helpers|Excel Export Helpers]]
- [[_COMMUNITY_Error Log & DOM Utils|Error Log & DOM Utils]]
- [[_COMMUNITY_CodeGen EditTable|CodeGen EditTable]]
- [[_COMMUNITY_Project Docs & Backend Concepts|Project Docs & Backend Concepts]]
- [[_COMMUNITY_Theme Engine|Theme Engine]]
- [[_COMMUNITY_Dictionary Data Component|Dictionary Data Component]]
- [[_COMMUNITY_Vue 3 Migration Concepts|Vue 3 Migration Concepts]]
- [[_COMMUNITY_Claude  Graphify Meta Docs|Claude / Graphify Meta Docs]]
- [[_COMMUNITY_TagsView  Sidebar Navigation|TagsView / Sidebar Navigation]]
- [[_COMMUNITY_Testing Strategy Spec|Testing Strategy Spec]]
- [[_COMMUNITY_Resize  Activate Mixins|Resize / Activate Mixins]]
- [[_COMMUNITY_Schedule CRUD|Schedule CRUD]]
- [[_COMMUNITY_JsonForm Field Builders|JsonForm Field Builders]]
- [[_COMMUNITY_TagsView Component|TagsView Component]]
- [[_COMMUNITY_Auth Token Helpers|Auth Token Helpers]]
- [[_COMMUNITY_Role API|Role API]]
- [[_COMMUNITY_API Icon Set|API Icon Set]]
- [[_COMMUNITY_Sidebar Menu Items|Sidebar Menu Items]]
- [[_COMMUNITY_Pagination Component|Pagination Component]]
- [[_COMMUNITY_Adobe Icon Templates|Adobe Icon Templates]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 102|Community 102]]
- [[_COMMUNITY_Community 103|Community 103]]
- [[_COMMUNITY_Community 104|Community 104]]
- [[_COMMUNITY_Community 105|Community 105]]
- [[_COMMUNITY_Community 106|Community 106]]
- [[_COMMUNITY_Community 107|Community 107]]
- [[_COMMUNITY_Community 108|Community 108]]
- [[_COMMUNITY_Community 109|Community 109]]
- [[_COMMUNITY_Community 110|Community 110]]
- [[_COMMUNITY_Community 111|Community 111]]
- [[_COMMUNITY_Community 112|Community 112]]
- [[_COMMUNITY_Community 113|Community 113]]
- [[_COMMUNITY_Community 114|Community 114]]
- [[_COMMUNITY_Community 115|Community 115]]
- [[_COMMUNITY_Community 116|Community 116]]
- [[_COMMUNITY_Community 117|Community 117]]
- [[_COMMUNITY_Community 118|Community 118]]
- [[_COMMUNITY_Community 119|Community 119]]
- [[_COMMUNITY_Community 120|Community 120]]
- [[_COMMUNITY_Community 121|Community 121]]
- [[_COMMUNITY_Community 122|Community 122]]
- [[_COMMUNITY_Community 123|Community 123]]
- [[_COMMUNITY_Community 124|Community 124]]
- [[_COMMUNITY_Community 204|Community 204]]
- [[_COMMUNITY_Community 205|Community 205]]
- [[_COMMUNITY_Community 206|Community 206]]
- [[_COMMUNITY_Community 207|Community 207]]
- [[_COMMUNITY_Community 208|Community 208]]
- [[_COMMUNITY_Community 209|Community 209]]
- [[_COMMUNITY_Community 210|Community 210]]
- [[_COMMUNITY_Community 211|Community 211]]
- [[_COMMUNITY_Community 212|Community 212]]
- [[_COMMUNITY_Community 213|Community 213]]
- [[_COMMUNITY_Community 214|Community 214]]
- [[_COMMUNITY_Community 215|Community 215]]
- [[_COMMUNITY_Community 216|Community 216]]
- [[_COMMUNITY_Community 217|Community 217]]
- [[_COMMUNITY_Community 218|Community 218]]

## God Nodes (most connected - your core abstractions)
1. `go-admin Project (English README)` - 28 edges
2. `data()` - 15 edges
3. `getList()` - 14 edges
4. `Vue 3 Upgrade Implementation Plan` - 14 edges
5. `handleDelete()` - 12 edges
6. `go-admin-ui Testing Strategy Design Doc` - 10 edges
7. `buildAttributes()` - 9 edges
8. `created()` - 9 edges
9. `reset()` - 9 edges
10. `handleQuery()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `go-admin Project (English README)` --semantically_similar_to--> `go-admin 專案 (Chinese README)`  [INFERRED] [semantically similar]
  README.md → README.Zh-cn.md
- `Node.js v18+` --semantically_similar_to--> `Node.js v14.16.0 (legacy requirement)`  [INFERRED] [semantically similar]
  README.md → README.Zh-cn.md
- `Branch: dev-to-vue3` --semantically_similar_to--> `dev-to-vue3 (main source branch)`  [INFERRED] [semantically similar]
  UPGRADE_TO_VUE3.md → x_fork.branch-origin.md
- `validate()` --calls--> `submit()`  [INFERRED]
  plop-templates/view/prompt.js → src/views/profile/resetPwd.vue
- `validate()` --calls--> `submit()`  [INFERRED]
  plop-templates/view/prompt.js → src/views/profile/userInfo.vue

## Hyperedges (group relationships)
- **Admin CRUD Pattern (getList + handleDelete + addDateRange)** — memory_getlist_node, memory_handledelete_node, memory_adddaterange_node, memory_listpost_node, memory_delpost_node [EXTRACTED 0.95]
- **Vue 3 Migration Phase Sequence (0..7)** — upgradevue3_phase_0_environment, upgradevue3_phase_1_research, upgradevue3_phase_2_dependency_upgrade, upgradevue3_phase_3_code_adaptation, upgradevue3_phase_5_test_regression [EXTRACTED 1.00]
- **Testing Strategy Phase Model (0 triage / 1 foundation / 2 expansion)** — testingstrategy_phase_0_triage, testingstrategy_phase_1_foundation, testingstrategy_phase_2_expansion, testingstrategy_layer_priority_targets, testingstrategy_test_style_guide [EXTRACTED 1.00]

## Communities (219 total, 42 thin omitted)

### Community 0 - "Utility Functions"
Cohesion: 0.06
Nodes (37): addDateRange(), resetForm(), selectDictLabel(), statusFormat(), delTable(), cancel(), created(), data() (+29 more)

### Community 1 - "Excel Export Helpers"
Cohesion: 0.08
Nodes (28): datenum(), export_json_to_excel(), export_table_to_excel(), generateArray(), s2ab(), sheet_from_array_of_arrays(), beforeUnload(), jsonClone() (+20 more)

### Community 2 - "Error Log & DOM Utils"
Cohesion: 0.07
Nodes (17): checkNeed(), setupErrorHandler(), addClass(), addEventClick(), cleanArray(), deepClone(), formatTime(), getTime() (+9 more)

### Community 3 - "CodeGen EditTable"
Cohesion: 0.06
Nodes (18): getTables(), apiToFile(), getTableTree(), importTable(), listDbTable(), previewTable(), toDBTable(), toProjectTableCheckRole() (+10 more)

### Community 4 - "Project Docs & Backend Concepts"
Cohesion: 0.08
Nodes (34): go-admin Meta Description, Memory Q: Gin/Casbin/JWT/GORM are degree-1 doc nodes, setToken/getToken/removeToken (utils/auth.js), Casbin RBAC, Code Generation Tool, Department Management Module, Dictionary Management Module, README.md (English) (+26 more)

### Community 5 - "Theme Engine"
Cohesion: 0.07
Nodes (14): getCSSString(), getThemeCluster(), theme(), created(), guid(), initWebSocket(), unmounted(), websocketclose() (+6 more)

### Community 6 - "Dictionary Data Component"
Cohesion: 0.09
Nodes (19): cancel(), created(), delData(), exportData(), getData(), getDicts(), getList(), getType() (+11 more)

### Community 7 - "Vue 3 Migration Concepts"
Cohesion: 0.08
Nodes (28): Element UI, Vue, Branch: dev-to-vue3, Vue 3 Composition API, Element Plus, Element UI to Element Plus Migration, npm-check-updates, Phase 0: Environment Preparation (+20 more)

### Community 8 - "Claude / Graphify Meta Docs"
Cohesion: 0.1
Nodes (29): Read GRAPH_REPORT.md before answering, Claude Code graphify Rules, addDateRange (utils/costum.js), beforeUnload() (TagsView), Memory Q: beforeUnload false bridge, Memory Q: data() bridges = name collision, data() (Vue Options API state), delConfig API call (+21 more)

### Community 9 - "TagsView / Sidebar Navigation"
Cohesion: 0.09
Nodes (7): addTags(), filterAffixTags(), initTags(), isActive(), mounted(), $route(), variables()

### Community 10 - "Testing Strategy Spec"
Cohesion: 0.09
Nodes (26): go-admin-ui Testing Strategy Design Doc, Phase 2 jest coverageThreshold gate, tests/KNOWN_ISSUES.md (planned), Layer Priority & Coverage Targets Table, Mock @/utils/request.js, not axios, Phase 0: Triage (skip + freeze), Phase 1: Foundation (utils + store), Phase 2: Expansion (api + components + CI gate) (+18 more)

### Community 11 - "Resize / Activate Mixins"
Cohesion: 0.17
Nodes (14): debounce(), activated(), beforeUnmount(), data(), deactivated(), $_destroyResizeEvent(), $_destroySidebarResizeEvent(), $_initResizeEvent() (+6 more)

### Community 12 - "Schedule CRUD"
Cohesion: 0.12
Nodes (7): options(), linkProps(), add(), resolvePath(), isExternal(), chainWebpack(), resolve()

### Community 13 - "JsonForm Field Builders"
Cohesion: 0.15
Nodes (4): buildFormTemplate(), buildFromBtns(), dialogWrapper(), makeUpHtml()

### Community 15 - "TagsView Component"
Cohesion: 0.19
Nodes (6): moveToCurrentTag(), addTags(), filterAffixTags(), initTags(), mounted(), $route()

### Community 16 - "Auth Token Helpers"
Cohesion: 0.15
Nodes (8): getToken(), setToken(), get(), set(), getPageTitle(), handleGenTable(), downLoadFile(), downLoadZip()

### Community 18 - "API Icon Set"
Cohesion: 0.33
Nodes (12): Add Database Icon, Add Document Icon, API Control Icon, API Documentation Icon, API Gateway Icon, API Monitor Icon, API Server Icon, API Test Icon (+4 more)

### Community 19 - "Sidebar Menu Items"
Cohesion: 0.2
Nodes (3): activeRoutes(), handleSelect(), if()

### Community 20 - "Pagination Component"
Cohesion: 0.27
Nodes (5): handleCurrentChange(), handleSizeChange(), move(), position(), scrollTo()

### Community 23 - "Adobe Icon Templates"
Cohesion: 0.25
Nodes (8): Adobe Dreamweaver Icon (Template 11), Adobe Illustrator Icon (Template 2), Adobe XD Icon (Template 4), Adobe After Effects Icon (Template 5), Adobe InDesign Icon (Template 6), Adobe Bridge Icon (Template 7), Adobe Lightroom Icon (Template 8), Adobe Dimension Icon (Template 9)

### Community 26 - "Community 26"
Cohesion: 0.38
Nodes (3): handler(), initChart(), setOptions()

### Community 27 - "Community 27"
Cohesion: 0.33
Nodes (3): created(), getServerInfo(), getServer()

### Community 28 - "Community 28"
Cohesion: 0.29
Nodes (7): Access Icon, Download Icon, Microsoft Edge Icon, Excel Icon, JSON Push Icon, Microsoft OneDrive Icon, Microsoft OneNote Icon

### Community 29 - "Community 29"
Cohesion: 0.29
Nodes (7): Adobe Icon, Adobe Flash Icon, Adobe Portfolio Icon, Picture Icon, Adobe Premiere Icon, Adobe Animate Icon, Adobe Photoshop Icon

### Community 32 - "Community 32"
Cohesion: 0.4
Nodes (6): Drag Copy Icon, Drag Icon, Edit Icon, Form Icon, Input Icon, List Icon

### Community 33 - "Community 33"
Cohesion: 0.33
Nodes (6): Doc Icon, Documentation Icon, Education Icon, Example Icon, Guide Icon, Icon Icon

### Community 34 - "Community 34"
Cohesion: 0.33
Nodes (6): Server Icon, Swagger Icon, System Icon, System Tools Icon, Tool Icon, Webhock Icon

### Community 38 - "Community 38"
Cohesion: 0.6
Nodes (3): doResize(), mounted(), updated()

### Community 39 - "Community 39"
Cohesion: 0.6
Nodes (3): bind(), handleClick(), update()

### Community 45 - "Community 45"
Cohesion: 0.5
Nodes (5): Alarm Settings Icon, Bug Icon, Build Icon, Code Icon, Dev Tools Icon

### Community 46 - "Community 46"
Cohesion: 0.4
Nodes (5): ConfigMap: nginx-frontend (default.conf), Deployment: go-admin-ui-v1, Service: go-admin-ui (port 80), SPA Root #app, Pre-mount Loader Wrapper

### Community 50 - "Community 50"
Cohesion: 0.67
Nodes (4): Cascader Icon, Checkbox Icon, Color Icon, Component Icon

### Community 51 - "Community 51"
Cohesion: 0.67
Nodes (4): Log Icon, Logininfor Icon, Monitor Icon, Online Icon

### Community 52 - "Community 52"
Cohesion: 0.5
Nodes (4): People Icon, Peoples Icon, Project Group Icon, Project Manage Icon

### Community 53 - "Community 53"
Cohesion: 0.67
Nodes (4): Message Icon, Phone Icon, Post Icon, Qq Icon

### Community 54 - "Community 54"
Cohesion: 0.67
Nodes (4): Select Icon, Slider Icon, Switch Icon, Textarea Icon

### Community 55 - "Community 55"
Cohesion: 0.67
Nodes (4): Statistics Icon, Table Icon, Tree Icon, Tree Table Icon

### Community 56 - "Community 56"
Cohesion: 0.67
Nodes (4): Skill Icon, User Icon, User Info Icon, VIP Icon

### Community 57 - "Community 57"
Cohesion: 0.5
Nodes (4): Adobe Character Animator (Ch) Icon, Adobe Audition (Au) Icon, Adobe Media Encoder (Dm) Icon, Adobe InCopy (Ic) Icon

### Community 58 - "Community 58"
Cohesion: 0.5
Nodes (4): Android Studio Icon, CLion Icon, IntelliJ IDEA Icon, PhpStorm Icon

### Community 59 - "Community 59"
Cohesion: 0.83
Nodes (4): PowerShell Icon, Visual Studio Icon, Windows Icon, Windows Terminal (Preview) Icon

### Community 70 - "Community 70"
Cohesion: 1.0
Nodes (3): Calendar Icon, Date Icon, Date Range Icon

### Community 71 - "Community 71"
Cohesion: 0.67
Nodes (3): Email Icon, GitHub Icon, Link Icon

### Community 72 - "Community 72"
Cohesion: 0.67
Nodes (3): Eye Icon, Eye Open Icon, Lock Icon

### Community 73 - "Community 73"
Cohesion: 1.0
Nodes (3): Pass Icon, Pwd Icon, Safety Icon

### Community 74 - "Community 74"
Cohesion: 0.67
Nodes (3): Shopping Icon, Star Icon, WeChat Icon

### Community 75 - "Community 75"
Cohesion: 1.0
Nodes (3): Size Icon, Tab Icon, Theme Icon

### Community 76 - "Community 76"
Cohesion: 1.0
Nodes (3): Time Avg Icon, Time Icon, Time Range Icon

### Community 77 - "Community 77"
Cohesion: 1.0
Nodes (3): Picture Loading Failed Icon, PictureUnknow Icon, Unknow Icon

### Community 78 - "Community 78"
Cohesion: 1.0
Nodes (3): PowerPoint Icon, Visio Icon, Word Icon

### Community 79 - "Community 79"
Cohesion: 1.0
Nodes (3): Word Backup Icon, Excel Backup Icon, PowerPoint Backup Icon

### Community 80 - "Community 80"
Cohesion: 1.0
Nodes (3): TXT Backup Icon, Document Icon, Folder Icon

### Community 81 - "Community 81"
Cohesion: 1.0
Nodes (3): Video Icon (Variant 2), Video Icon, Voice Icon

### Community 82 - "Community 82"
Cohesion: 0.67
Nodes (3): 401 Unauthorized Error Illustration (Girl with Ice Cream), 404 Cloud Decoration, 404 Not Found Error Illustration (Isometric 404 Sign)

## Knowledge Gaps
- **156 isolated node(s):** `RESTful API Design`, `Swagger via swaggo`, `GORM ORM`, `Code Generation Tool`, `User Management Module` (+151 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `data()` connect `Utility Functions` to `TagsView / Sidebar Navigation`, `Error Log & DOM Utils`, `Theme Engine`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `beforeUnload()` connect `Excel Export Helpers` to `TagsView / Sidebar Navigation`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `go-admin Project (English README)` (e.g. with `go-admin Meta Description` and `go-admin 專案 (Chinese README)`) actually correct?**
  _`go-admin Project (English README)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `getList()` (e.g. with `listConfig()` and `listSysLoginlog()`) actually correct?**
  _`getList()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `handleDelete()` (e.g. with `delConfig()` and `delSysLoginlog()`) actually correct?**
  _`handleDelete()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `RESTful API Design`, `Swagger via swaggo`, `GORM ORM` to the rest of the system?**
  _156 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Utility Functions` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._