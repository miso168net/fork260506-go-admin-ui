# graphify 知識圖快照紀錄(2026-05-06)

對本 repo 跑了 `/graphify . --obsidian`,把產物以獨立分支 + PR 方式合進 `main`。本檔記錄當次 session 的決策、執行流程、產物與 caveat,作為日後追蹤用的元資訊。

## 概要

| 項目 | 內容 |
|---|---|
| 執行日 | 2026-05-06 |
| Skill | `/graphify` (來自 `~/.claude/skills/graphify/`) |
| 工具版本 | pipx 安裝的 `graphifyy` 套件,模組名 `graphify`(非錯字) |
| 命令 | `/graphify . --obsidian` |
| 起始 HEAD(main) | `7fe9e0f` — docs: add x_fork.branch-origin.md |
| 工作分支 | `graphify-20260506` |
| Commit | `ac7728f` — chore: 加入 graphify 知識圖快照(2026-05-06) |
| PR | [#1](https://github.com/miso168net/fork260506-go-admin-ui/pull/1) `chore: 加入 graphify 知識圖快照 (2026-05-06)` |
| Merge 方式 | `gh pr merge 1 --merge`(一般 merge commit) |
| Merge commit | `6325730` (2026-05-05T19:44:02Z UTC) |
| 動到 tracked 程式碼/設定? | **否** — 全部新增於 `graphify-out/` 下 |

## 決策過程

### 1. 安裝檢查
- 系統先以 `which graphify` 查到 `/home/anew/.local/bin/graphify`,模組已就位。
- 嘗試 `pip install graphifyy` 被 sandbox 阻擋(雙 y 看似仿冒),但實際上 pipx env 名稱就是 `graphifyy`、import 名是 `graphify`,屬正常情況,跳過安裝直接用既有 interpreter。

### 2. 範圍選擇
- detect 結果:**406 檔 / ~100,330 字 / 202 code + 5 docs + 199 image + 0 video**
- 超過 200 檔 skill 規定要先確認;199 image 中有 192 是 UI icon (127 SVG + 65 PNG)
- 用 AskUserQuestion 給 4 個選項,使用者選 **「整個專案」**

### 3. 偏離 skill 嚴格規定的地方
- skill 原文:「Each image gets its own chunk (vision needs separate context)」
- 實際做法:把 SVG icon (XML 文字、不需 vision)以 32 個一束包成 4 chunks;PNG icon 以 17 個一束包成 4 chunks;5 個 docs 一束;7 個 misc visual 一束
- 理由:200 個 vision subagent 不切實際,且 SVG 是純文字(skill 「one-per-chunk」的理由是 vision context、對 SVG 不適用)
- 結果:總共 10 chunks,單一訊息平行派出,~2 分鐘內全部完成

## 數字

| 指標 | 值 |
|---|---|
| AST 抽取 | 753 nodes / 898 edges (202 code 檔) |
| 語意抽取 | 252 nodes / 223 edges / 30 hyperedges (10 chunks) |
| 合併後 | 1005 nodes / 1931 edges |
| 建圖去重後 | **922 nodes / 948 edges / 214 communities** |
| Obsidian notes | 1136 |
| Token 縮減 | 約 190× (corpus ~133k token → 平均查詢 ~703 token) |
| Subagent token 用量總和 | ~253k(10 chunks 加總,inputs+outputs) |

## 產物(全部在 `graphify-out/`)

| 路徑 | 用途 |
|---|---|
| `GRAPH_REPORT.md` | 審計報告(god nodes、surprising connections、suggested questions、knowledge gaps) |
| `graph.html` | 互動式視覺化(瀏覽器直接開) |
| `graph.json` | 原始圖資料(可餵給 GraphRAG / MCP) |
| `obsidian/` | 1136 notes + `graph.canvas`,可直接以 Obsidian 開為 vault |
| `cache/` | per-file 語意抽取快取,下次 `--update` 直接命中 |
| `memory/` | 4 條已驗證查詢結果 |
| `manifest.json` | 增量比對基準 |
| `cost.json` | 累計 token 使用記錄 |
| `.gitignore` | 排除本機 `.graphify_python` (pipx 路徑,不該進 repo) |

## 已驗證的 4 個查詢(寫進 `graphify-out/memory/`)

1. **`data()` 為何同時連到 Utility Functions / App Bootstrap / Theme Engine / Sidebar Tags & Navbar?**
   → **假橋接**。AST 抽取以「裸函數名」當 key,把所有 Vue 元件的 Options-API `data()` 合併成同一個節點。c0 cohesion 0.06 即由此而來。
2. **`beforeUnload()` 為何連 Excel Export 與 Sidebar Tags?**
   → **假橋接**。c2 被命名為「Excel Export Helpers」是因為 export_*_to_excel 在那邊,但 `beforeUnload()` 真正連的是同 c2 的 `parse()`(`utils/generator/index.js`)。
3. **`getList()` 的 6 條 INFERRED 邊正確嗎?**
   → **全部正確**(grep 驗證)。每個 admin CRUD 頁面的 getList 都呼叫對應 `list<Entity>(addDateRange(...))`,AST 跨檔解析不到所以標 INFERRED,但 pattern 100% 對。
4. **`Gin / Casbin / RESTful / JWT / GORM / Swagger / Phase 0..7` 怎麼連回程式碼?**
   → **正確未連**。本 repo 是前端 fork (go-admin-ui),後端在 sibling repo (go-admin-team/go-admin)。Phase 0..7 是 UPGRADE_TO_VUE3.md 裡的計畫節點,非程式碼。圖是誠實的。

## Caveat

- `data()` / `created()` / `mounted()` 等 Vue lifecycle hook 在圖裡 degree 偏高,均屬於 AST 命名碰撞造成的 artifact,**不是真依賴**。
- 214 個 community 偏多,因為 192 個 icon 各自連到 1-2 個同主題 icon、形成許多小 community;真正有意義的是前 25 個(已人工命名)。
- `graphify-out/` 約 2.5 MB,含 583KB graph.html + 625KB graph.json + 1136 個 markdown notes(obsidian vault)。將來重跑會覆寫,要保留歷史快照可開新分支。

## 重跑/維護

```bash
# 增量更新(只重抽改動檔):
/graphify . --update

# 清除舊 cache 重跑:
rm -rf graphify-out/cache && /graphify . --obsidian

# 不寫 Obsidian、只更新 HTML/JSON:
/graphify .

# 對單一概念查詢:
/graphify query "為何 setToken 同時被 axios 和 router 用到"

# 兩節點之間最短路徑:
/graphify path "Auth Token Helpers" "Permission Routing"
```

## 注意事項

本檔案只記錄此次 graphify session 的元資訊與決策紀錄,不影響任何程式邏輯,可以安全忽略或刪除。
