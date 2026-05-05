---
type: "query"
date: "2026-05-05T18:52:42.777317+00:00"
question: "beforeUnload() bridge between Excel Export and Sidebar Tags?"
contributor: "graphify"
source_nodes: ["beforeUnload", "TagsView", "parse"]
---

# Q: beforeUnload() bridge between Excel Export and Sidebar Tags?

## Answer

False bridge — only one beforeUnload() exists (TagsView/index.vue, c2). Its 3 edges go to mounted() c7, the file's own index.vue c7, and parse() c2. The 'cross to Excel' implied by community labels was a labeling artifact: c2 was labeled 'Excel Export Helpers' because export_json/table_to_excel sit there, but parse() (utils/generator/index.js) also lives in c2 and that is what beforeUnload calls. So beforeUnload bridges TagsView to the generator/util layer, not to Excel.

## Source Nodes

- beforeUnload
- TagsView
- parse