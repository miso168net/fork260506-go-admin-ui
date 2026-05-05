---
type: "query"
date: "2026-05-05T18:50:31.515578+00:00"
question: "Why does data() connect Utility Functions to App Bootstrap & DOM Utils, Theme Engine, Sidebar Tags & Navbar?"
contributor: "graphify"
source_nodes: ["data()", "RightPanel", "ThemePicker", "TagsView"]
---

# Q: Why does data() connect Utility Functions to App Bootstrap & DOM Utils, Theme Engine, Sidebar Tags & Navbar?

## Answer

The bridging node is the data() defined in src/views/dev-tools/swagger/index.vue. It is wired to community 0 (Utility Functions) because that community is dominated by the many sibling data() functions across views/components plus the project's util layer. The cross-community contains edges trace to: src/components/RightPanel/index.vue (community 3 - App Bootstrap & DOM Utils), src/components/ThemePicker/index.vue (community 5 - Theme Engine), and src/layout/components/TagsView/index.vue (community 7 - Sidebar Tags & Navbar). The connections are NOT semantic dependencies - they are AST 'contains' edges from a shared symbol name 'data()'. Multiple Vue components each define a method called data() (the Options-API state factory), and all those local data() symbols collapse into the same graph node because the AST extractor matched on bare function name. So data() is not a real shared abstraction - it is a name collision across many index.vue files. This is why cohesion of community 0 is only 0.06 - the community is held together by the spurious shared name. Real fix: either qualify nodes by file path (data() in component X != data() in component Y) or merge the cluster only when call/import edges actually exist. Until the extractor changes, treat data() as a graph artifact, not a dependency.

## Source Nodes

- data()
- RightPanel
- ThemePicker
- TagsView