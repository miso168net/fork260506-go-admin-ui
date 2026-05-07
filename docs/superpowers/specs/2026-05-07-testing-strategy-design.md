# go-admin-ui 單元測試策略 — Design Doc

**Date**: 2026-05-07
**Topic**: testing-strategy
**Author**: brainstormed via `superpowers:brainstorming` (Claude Opus 4.7)
**Status**: Draft → awaiting user review → next: `superpowers:writing-plans`

> 這份**設計稿**捕捉「該寫什麼」的決策。它不是 Spec Kit 的 `spec.md` —
> 後續跑 `/speckit-specify` 時會以本檔為輸入,生成 `specs/<###>-testing-strategy/spec.md`。

---

## 1. Goal & Non-Goals

### Goal

為 `go-admin-ui` 建立一份明確、分階段、可漸進落地的單元測試策略。第一階段的工作只交付「triage 既有失敗測試 + 凍結現狀」,後續實作工作各自走獨立的 Spec Kit feature。

### Non-Goals(本策略不解決)

- E2E / 整合測試(`src/views/*` 串接、router、登入流程)
- Snapshot 測試規範化(預設不採用)
- TypeScript 化測試
- Coverage 視覺化網站、外部報表
- 修動 `jest.config.js` 的 `collectCoverageFrom` 範圍(暫由 Phase 1 / 2 各自 feature 決定)
- 修源碼 bug(包含已知的 `src/utils/index.js` `time_str` use-before-declare)— 留給 Phase 1
- CI runner 改造、GitHub Actions workflow 變更

---

## 2. Decisions Recap

本策略由以下逐題對話決定。保留作為設計緣由的 audit trail。

| # | 問題 | 答案 |
|---|---|---|
| Q1 | 初始 spec-kit 文件主題 | **B** — 補齊單元測試覆蓋 |
| Q2 | 範圍大小 | **D** — 先寫策略 spec,不動源碼/測試碼 |
| Q3 | 策略要拍板哪些事 | **ABCDE** — 模組優先順序、覆蓋率目標+CI gate、測試風格指南、失敗測試處理、範本 walkthrough |
| Q4 | 9 個失敗測試怎麼處理 | **D** — 全部 skip + TODO,不動源碼/測試碼 |
| Q5 | 覆蓋率目標多硬 | **C** — 數字寫在 spec 當目標,CI 報告不 block |
| Q6 | 模組優先順序 | **D** — 分層 + 層內用 graphify 找熱門模組 |
| Q7 | E 範本 walkthrough 規模 | **A** — 1 個示範模組 = `src/store/modules/user.js` |
| Approach | 文件結構 | **1** — 單一 spec doc + 三階段 phase + 範本當附錄 |

---

## 3. Phase Model

策略本身只到 Phase 0 完工就算交付完成。Phase 1 / 2 是後續各自獨立 Spec Kit feature 的指引,寫在這裡是為了給 Phase 0 的決策提供脈絡。

### Phase 0 — Triage(本策略落地後立即可做)

**範圍**:加 `it.skip` / `describe.skip`、補註解、紀錄已知 bug。**不修任何源碼或測試實作**。

**動作**:
1. `tests/unit/components/Hamburger.spec.js` — 包成 `describe.skip`,註解「Vue 2 test-utils 1.x API,將於 Phase 2 重寫」。
2. `tests/unit/components/SvgIcon.spec.js` — 同上。
3. `tests/unit/utils/formatTime.spec.js` — `describe.skip`,註解「依賴 `src/utils/index.js` `time_str` 源碼 bug,Phase 1 修源碼後解 skip」。
4. `tests/unit/utils/parseTime.spec.js` — 同上。
5. `tests/unit/utils/validate.spec.js` — 跑一次驗證仍綠,保留。
6. 新增 `tests/KNOWN_ISSUES.md`,列入兩條 known issues:
   - `src/utils/index.js:15` `time_str` use-before-declare
   - 兩個 component spec 待 Phase 2 重寫

**Exit Criteria**:`npm run test:unit` 跑得完,沒有 failed,只有 skipped(或 passed)。

---

### Phase 1 — Foundation(後續 Spec Kit feature)

**範圍**:`src/utils/` + `src/store/modules/` 兩層補測試到目標覆蓋率。

**動作要點**:
- 修源碼 bug `time_str`(順手解 `formatTime` / `parseTime` 兩支 spec 的 skip)。
- 按 §4 排序新增 utils 與 store 測試。
- 套用 §6 風格指南。
- 落地 §7 walkthrough(`store/modules/user.js`)為實際測試檔。
- 風格指南 + walkthrough 結果合併進主分支,作為 Phase 2 的範本來源。

**Exit Criteria**:utils ≥ 85% / store ≥ 70% statements,`npm run test:unit -- --coverage` 印出達標報告。

---

### Phase 2 — Expansion(再後續 Spec Kit feature)

**範圍**:`src/api/` + `src/components/` + 升級 CI gate。

**動作要點**:
- 重寫 Phase 0 skip 的兩個 component spec。
- 按 §4 排序新增 api 與 components 測試。
- 修改 `jest.config.js`:加 `coverageThreshold`,把 `npm run test:ci` 改為「不達標即 fail」。

**Exit Criteria**:四層皆達 §4 目標 + CI gate 啟用,PR 不過 coverage threshold 即被 block。

---

## 4. Layer Priority & Coverage Targets

| Layer | 落在 | 目標覆蓋率(statements) | 層內排序方法 | 備註 |
|---|---|---|---|---|
| `src/utils/` | Phase 1 | **85%** | graphify in-degree:`auth.js`、`request.js`、`validate.js`、`permission.js` 為熱點;`index.js` 龐大但已部分有測試 | jest.config 既有範圍,排除 `auth.js` / `request.js` 維持 |
| `src/store/modules/` | Phase 1 | **70%** | `user.js` → `permission.js` → `app.js` → `tagsView.js` → `errorLog.js` → `settings.js` | walkthrough 以 `user.js` 為樣本(§7) |
| `src/api/` | Phase 2 | **50%** | `login.js` → `user.js` → `role.js` → `menu.js` → `dept.js` → 其餘 | 透過 mock `src/utils/request.js` 測,不打網路 |
| `src/components/` | Phase 2 | **60%** | `Pagination` → `SvgIcon` → `Hamburger` → 其餘(graphify hub 排序) | Phase 0 skip 的兩個 spec 在此重寫 |
| `src/views/` | — | 不在範圍 | — | 整合 / E2E 測試屬未來議題 |

**CI Gate 升級節奏**:
- Phase 0:不變(`npm run test:ci` = `npm run lint && npm run test:unit`,無 coverage gate)。
- Phase 1:`npm run test:unit -- --coverage` 在實作期手動看報告;jest.config 仍**不**設 `coverageThreshold`。
- Phase 2:`jest.config.js` 加 `coverageThreshold` 物件,key 對應四層;`npm run test:ci` 改用 `--coverage` 旗標讓不達標即 fail。

**graphify 使用方式**(層內排序):
- 跑 `graphify update .` 取得最新圖,以 in-degree 排序篩選每層的 top-N 熱門模組。
- 圖譜不能單獨決定優先順序 — 它輔助 §4 表格的「層內排序方法」欄位。
- 每層在實作 feature 時,於該 feature 的 plan.md 中列出實際 top-N 名單(本策略不固化具體名單)。

---

## 5. Failed Test Triage

### 5.1 既有 5 個 spec 檔的處置

| 檔案 | 問題 | Phase 0 動作 | 後續處置 |
|---|---|---|---|
| `tests/unit/components/Hamburger.spec.js` | test-utils 1.x API:`wrapper.contains()`(removed)、`wrapper.vm.$on()`(Vue 2 event API) | `describe.skip` + 註解 | Phase 2 重寫(屬 components 層) |
| `tests/unit/components/SvgIcon.spec.js` | `propsData`(1.x)、同步 `setProps`(2.x 須 `await`) | `describe.skip` + 註解 | Phase 2 重寫 |
| `tests/unit/utils/formatTime.spec.js` | 連帶失敗於 `src/utils/index.js` 的 `time_str` use-before-declare bug | `describe.skip` + 註解 | Phase 1 修源碼 → 解 skip |
| `tests/unit/utils/parseTime.spec.js` | 同上 | `describe.skip` + 註解 | Phase 1 修源碼 → 解 skip |
| `tests/unit/utils/validate.spec.js` | UPGRADE 文件未點名,推測通過 | Phase 0 跑一次驗證,綠則保留 | 持續維護 |

### 5.2 已知源碼 bug(Phase 0 不修,只記錄)

**`src/utils/index.js`**:`time_str` 變數在 line 15 被讀取(`if (time_str.indexOf('01-01-01') > -1)`),但 `const time_str = format.replace(...)` 直到 line 40 才宣告。`parseTime` 與 `formatTime` 兩支測試的失敗皆源於此。

**處置**:Phase 1 修。新增 `tests/KNOWN_ISSUES.md` 紀錄,於該檔被覆蓋率工作觸及時一併解。

---

## 6. Test Style Guide(8 條核心)

1. **預設 `mount()`**(`@vue/test-utils` 2.x);`shallowMount()` 僅在 child 元件 DOM 噪音壓過斷言重點時用。
2. **Element Plus globals**:用 `mount(Comp, { global: { plugins: [ElementPlus] } })` 注入,或用 `global.stubs` 整批 stub Element Plus 元件。在 walkthrough 中示範一次。
3. **Vuex 4 store**:每個測試自建 mock store(`createStore({ modules: { user: userModule } })`)。**禁止** import `src/store/index.js`。
4. **不打網路**:mock `@/utils/request.js`(專案的 axios 封裝),不直接 mock `axios`。
5. **async 必 await**:`flushPromises`、`nextTick`、`setProps`、`trigger` 後續斷言均 `await`。
6. **檔案命名**:`tests/unit/<mirror-of-src-path>/<module>.spec.js`(例如 `src/store/modules/user.js` → `tests/unit/store/modules/user.spec.js`)。
7. **fixtures**:共用 mock 資料放 `tests/fixtures/<topic>.js`,測試內禁止行內貼大塊 JSON。
8. **snapshot**:預設不採用,除非 DOM 結構穩定且複雜(例如 Pagination 元件邊界)。需採用時,以 PR 描述敘明理由。

風格指南更詳細的範例由 §7 walkthrough 補充。

---

## 7. Walkthrough Scope — `src/store/modules/user.js`

### 7.1 為什麼挑這個模組

- **新 pattern**:既有 utils 測試 = utils 範本;store 是缺的拼圖。
- **高風險中心**:login / token / 角色 / 權限,所有 page 經過 `getInfo` action 拿身分。
- **多側效應**:axios 呼叫、cookie 操作、router push、localStorage — 一次示範 4 種 mock 邊界。

### 7.2 被測表面

```
state(7 個 keys):token / name / avatar / introduction / roles / permissions / permisaction
mutations(6 個):SET_TOKEN / SET_INTRODUCTION / SET_NAME / SET_AVATAR / SET_ROLES / SET_PERMISSIONS
actions(預估 4 個):login / getInfo / logout / refreshtoken
```

### 7.3 測試案例清單(walkthrough 中以 `it()` 描述列出)

**Mutations**:
- 每個 mutation 的 happy path × 1
- `SET_AVATAR` 的兩條分支(http URL 直接寫入 / 非 http 路徑加 `VUE_APP_BASE_API` 前綴)各 1

**Actions**:
- 每個 action 的 success path × 1(mock api 回 resolve)
- `login` 的 reject path(api 回 reject,token 不寫入)
- `getInfo` 的 empty-response path(`!response || !response.data`)

### 7.4 Mock 邊界圖(walkthrough 教學重點)

```
                 ┌─ jest.mock('@/api/user')         → login/logout/getInfo/refreshtoken: mockResolvedValue
   user store ──┤
                 ├─ jest.mock('@/utils/auth')        → getToken/setToken/removeToken: jest.fn()
                 ├─ jest.mock('@/router')            → resetRouter / router.push: jest.fn()
                 └─ jest.mock('@/utils/storage')     → storage.set/get/remove: jest.fn()
```

### 7.5 範例骨架(本設計稿只示範 2 段,完整測試檔留 Phase 1 寫)

#### 7.5.1 Mutation 骨架(`SET_AVATAR`,有分支邏輯)

```js
// tests/unit/store/modules/user.spec.js (excerpt)
import userModule from '@/store/modules/user'

describe('store/user mutations', () => {
  describe('SET_AVATAR', () => {
    it('使用完整 http URL 時,直接寫入 state', () => {
      const state = { avatar: '' }
      userModule.mutations.SET_AVATAR(state, 'http://cdn.example.com/a.png')
      expect(state.avatar).toBe('http://cdn.example.com/a.png')
    })

    it('使用相對路徑時,前綴 VUE_APP_BASE_API', () => {
      process.env.VUE_APP_BASE_API = '/api'
      const state = { avatar: '' }
      userModule.mutations.SET_AVATAR(state, '/uploads/a.png')
      expect(state.avatar).toBe('/api/uploads/a.png')
    })
  })
})
```

#### 7.5.2 Action 骨架(`login`,展示 4 個 mock 邊界中的 2 個)

```js
// tests/unit/store/modules/user.spec.js (excerpt)
import { createStore } from 'vuex'
import userModule from '@/store/modules/user'
import { login } from '@/api/user'
import { setToken } from '@/utils/auth'

jest.mock('@/api/user')
jest.mock('@/utils/auth')
jest.mock('@/router', () => ({ resetRouter: jest.fn() }))

describe('store/user actions', () => {
  let store
  beforeEach(() => {
    jest.clearAllMocks()
    store = createStore({ modules: { user: { ...userModule, namespaced: false } } })
  })

  describe('login', () => {
    it('成功時 commit SET_TOKEN 並呼叫 setToken', async () => {
      login.mockResolvedValueOnce({ token: 'tk_123' })
      await store.dispatch('login', { username: 'u', password: 'p' })
      expect(store.state.user.token).toBe('tk_123')
      expect(setToken).toHaveBeenCalledWith('tk_123')
    })

    it('api reject 時不更動 token,Promise reject', async () => {
      login.mockRejectedValueOnce(new Error('401'))
      await expect(store.dispatch('login', {})).rejects.toThrow('401')
      expect(setToken).not.toHaveBeenCalled()
    })
  })
})
```

#### 7.5.3 其餘 case 不寫程式,以條列說明

- **`SET_TOKEN` / `SET_NAME` / `SET_INTRODUCTION` / `SET_ROLES` / `SET_PERMISSIONS`**:每個 1 個 happy path,測「mutation 把參數寫進 state[該 key]」即可,寫法照 7.5.1 的非分支版本。
- **`getInfo` action**:happy path(api 回完整資料 → commit 多個 mutations)+ empty-response path(`!response || !response.data` → reject)。
- **`logout` action**:呼叫 api → `removeToken` → `resetRouter` 三個側效應觀察點。
- **`refreshtoken` action**:happy path,觀察 `SET_TOKEN` 與 `setToken` 同步。

設計稿不貼完整測試檔 — **完整測試檔在 Phase 1 實作期才寫**,寫完後該檔成為其他 store module 的活教材。

---

## 8. Out-of-Scope

- ❌ E2E / 整合測試
- ❌ Snapshot 測試規範化(風格指南第 8 條已涵蓋)
- ❌ TypeScript 化測試
- ❌ Coverage 視覺化網站
- ❌ 修動 `jest.config.js` 的 `collectCoverageFrom` 範圍(Phase 1 / 2 各自 feature 自行決定)
- ❌ 修源碼 bug — 留給 Phase 1
- ❌ CI runner 改造、GitHub Actions workflow

---

## 9. Open Questions / TODO

- ⚠️ **`src/utils/auth.js` 的測試處置**:jest.config `collectCoverageFrom` 排除它。Phase 1 是否仍要寫測試(只是不計入覆蓋率)?還是真的不測?(與 `src/utils/request.js` 同樣議題)
- ⚠️ **Phase 2 升級為硬 CI gate 時**,要不要同步加 `coverage badge` 到 README?
- ⚠️ **graphify in-degree 排序的具體執行**:graphify 目前的 query 介面是 BFS-shaped,不直接給 in-degree ranking。Phase 1 / 2 在排序層內模組時,需要決定:
  - 直接用 `graphify-out/GRAPH_REPORT.md` 的 community hub 列表?
  - 還是改用 `wc -l src/<layer>/*.js` + `grep -rn "from '@/<layer>" src/views/ src/components/` 手動估?

---

## 10. Transition to Implementation

下一步:呼叫 `superpowers:writing-plans` skill,把本設計稿轉為 Phase 0 的實作計畫。Phase 1 / 2 各自的實作計畫由日後對應的 Spec Kit feature 產生,**不在本次任務範圍**。

---

## Appendix: 連結

- Project constitution: `.specify/memory/constitution.md`(v1.0.0,2026-05-07 批准)
- Spec Kit 流程:`.specify/templates/spec-template.md`、`plan-template.md`、`tasks-template.md`
- 既有 jest 設定:`jest.config.js`(`collectCoverageFrom: ['src/utils/**/*.{js,vue}', '!src/utils/auth.js', '!src/utils/request.js', 'src/components/**/*.{js,vue}']`)
- Vue 3 升級脈絡:`UPGRADE_TO_VUE3.md`
- 知識圖:`graphify-out/GRAPH_REPORT.md`
