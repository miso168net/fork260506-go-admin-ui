# 專案檔案結構與用途註解(2026-05-06 snapshot)

本檔案對應 `tree` 命令在 `fork260506-go-admin-ui/` 根目錄的輸出,
為每個檔案/目錄補上一行用途註解,作為閱讀程式碼前的索引。

- 命名沿用 `x_fork.graphify-20260506.md` 的「snapshot 日期」慣例。
- `graphify-out/` 內容由工具自動生成,於目錄層級一句話帶過,**不展開**。
- `src/assets/icons/` 與 `src/icons/svg/` 各含上百個業務圖示,於目錄層級
  一句話帶過,不逐檔列出。
- 其餘 Vue 原始碼、設定、文件每一檔都附註解。

```
.
├── CLAUDE.md                            # 給 Claude Code 看的專案指令(graphify 規則 + spec-kit 慣例)
├── Dockerfile                           # 容器化建置入口(多階段 build,輸出靜態 dist)
├── LICENSE                              # MIT License
├── README.Zh-cn.md                      # 中文 README(go-admin 全家桶說明)
├── README.md                            # 英文 README
├── UPGRADE_TO_VUE3.md                   # Vue 2 → Vue 3 升級實施文檔(known issue 來源)
├── VUE3_UPGRADE_COMPLETE.md             # 升級完工標誌檔(目前為空 → 尚未完工)
├── babel.config.js                      # Babel 設定(@vue/cli-plugin-babel 預設)
├── index.html                           # SPA 入口 HTML
├── jest.config.js                       # Jest 26 設定(transform / coverage / 別名)
├── jsconfig.json                        # VS Code 路徑別名解析(@ → src)
├── package-clean.json                   # 空檔(歷史遺留,可清)
├── package.json                         # 主依賴與 npm scripts(dev/build/lint/test:unit/test:ci)
├── plopfile.js                          # plop 程式碼產生器入口(npm run new)
├── postcss.config.js                    # PostCSS 設定(autoprefixer)
├── test-vue3.js                         # Vue 3 升級期臨時驗證腳本(完工後可清)
├── vite.config.js                       # Vite 設定(實驗性,主流仍走 vue-cli-service)
├── vue.config.js                        # vue-cli-service 主設定(webpack 客製、proxy)
│
├── build/
│   └── index.js                         # vue-cli `npm run preview` 用的 dist 預覽伺服器
│
├── docs/                                # 文件目錄(目前僅 superpowers brainstorming 產出)
│   └── superpowers/
│       └── specs/
│           └── 2026-05-07-testing-strategy-design.md  # 測試策略設計稿(untracked)
│
├── graphify-out/                        # graphify 知識圖譜輸出目錄(整個由工具生成,勿手改)
│
├── plop-templates/                      # `npm run new` 程式碼樣板
│   ├── component/
│   │   ├── index.hbs                    # 元件 SFC 樣板(handlebars)
│   │   └── prompt.js                    # plop 互動問題定義
│   ├── store/
│   │   ├── index.hbs                    # vuex module 骨架樣板
│   │   └── prompt.js                    # 互動問題定義
│   ├── utils.js                         # 樣板共用工具(命名轉換等)
│   └── view/
│       ├── index.hbs                    # 頁面 SFC 骨架樣板
│       └── prompt.js                    # 互動問題定義
│
├── public/
│   └── favicon.ico                      # 網站圖示(Vue CLI 預設位置,build 時 copy 到 dist)
│
├── scripts/
│   └── k8s/                             # K8s 部署相關
│       ├── default.conf                 # Nginx 設定(SPA fallback、反向代理 /api)
│       ├── deploy.yml                   # K8s Deployment / Service YAML
│       └── prerun.sh                    # 容器啟動前處理(env 注入、靜態檔 patch)
│
├── src/
│   ├── App.vue                          # 根元件(<router-view />、全域 layout 切換)
│   ├── main.js                          # 應用啟動入口(createApp + 注入 router/store + mount)
│   ├── permission.js                    # 全域 router beforeEach 守衛(token 檢查、動態路由載入)
│   ├── settings.js                      # 全域 UI 設定(title / sidebar 行為)
│   │
│   ├── api/                             # 後端契約層(對應 go-admin Gin 後端)
│   │   ├── admin/                       # /admin 系列 API
│   │   │   ├── dict/
│   │   │   │   ├── data.js              # 字典資料 CRUD
│   │   │   │   └── type.js              # 字典類型 CRUD
│   │   │   ├── sys-api.js               # 系統 API 管理(後端註冊端點清單)
│   │   │   ├── sys-config.js            # 系統參數設定 CRUD
│   │   │   ├── sys-dept.js              # 部門 / 組織樹 CRUD
│   │   │   ├── sys-login-log.js         # 登入日誌查詢
│   │   │   ├── sys-menu.js              # 系統選單 CRUD(動態路由來源)
│   │   │   ├── sys-opera-log.js         # 操作日誌查詢
│   │   │   ├── sys-post.js              # 職位 CRUD
│   │   │   ├── sys-role.js              # 角色 CRUD(角色–選單–權限)
│   │   │   └── sys-user.js              # 使用者 CRUD
│   │   ├── job/
│   │   │   └── sys-job.js               # 排程任務 CRUD(配後端 cron worker)
│   │   ├── login.js                     # 登入 / 登出 / getInfo
│   │   ├── monitor/
│   │   │   └── server.js                # 伺服器監控資訊(CPU/RAM/disk)
│   │   ├── remote-search.js             # 遠端搜尋自動完成(下拉用)
│   │   ├── schedule.js                  # 排程清單與操作(列表頁專用)
│   │   ├── table.js                     # 通用表格資料 mock(demo)
│   │   ├── tools/
│   │   │   └── gen.js                   # 程式碼產生器後端 API(讀資料表、產 CRUD)
│   │   ├── user.js                      # 使用者 API(login/logout/getInfo/refreshtoken)
│   │   └── ws.js                        # WebSocket 客戶端封裝
│   │
│   ├── assets/                          # 靜態資源
│   │   ├── 401_images/401.gif           # 401 頁插畫
│   │   ├── 404_images/                  # 404 頁插畫(404.png + 404_cloud.png)
│   │   ├── custom-theme/                # 自訂 Element 主題打包輸出
│   │   │   ├── fonts/                   # element-icons 字型(.ttf / .woff)
│   │   │   └── index.css                # 主題 CSS 入口
│   │   ├── dark.svg                     # 深色主題切換按鈕
│   │   ├── icons/                       # 70 餘個 PNG 圖示(IDE / 軟體 logo / 通用裝飾)
│   │   ├── light.svg                    # 淺色主題切換按鈕
│   │   ├── login.png                    # 登入頁背景
│   │   ├── logo/logo.png                # 專案 logo
│   │   └── particles.json               # tsparticles 粒子背景設定(登入頁)
│   │
│   ├── components/                      # 可重用元件
│   │   ├── Bar.vue                      # echarts Bar chart 包裝
│   │   ├── Breadcrumb/index.vue         # 麵包屑(讀 $route.matched 渲染)
│   │   ├── Cell/index.vue               # 表格 cell 樣式 wrapper
│   │   ├── ChartCard/index.vue          # 統計卡片(數字 + 趨勢)
│   │   ├── Charts/                      # echarts 系列元件
│   │   │   ├── Keyboard.vue             # 鍵盤可視化(地理熱圖風)
│   │   │   ├── LineMarker.vue           # 折線 + marker
│   │   │   ├── MixChart.vue             # 折線 + 柱混合圖
│   │   │   └── mixins/resize.js         # 圖表 resize mixin(graphify hub)
│   │   ├── ErrorLog/index.vue           # 錯誤日誌彈窗(Navbar 圖示觸發)
│   │   ├── FormGenParser/Parser.vue     # 表單建構器:JSON schema → 渲染表單
│   │   ├── FormGenRender/                # 表單建構器:渲染端
│   │   │   ├── render.js                # 主 render(JSX 風)
│   │   │   └── slots/                   # 各 Element 元件的 slot 渲染器
│   │   │       ├── el-button.js
│   │   │       ├── el-checkbox-group.js
│   │   │       ├── el-input.js
│   │   │       ├── el-radio-group.js
│   │   │       ├── el-select.js
│   │   │       └── el-upload.js
│   │   ├── GithubCorner/index.vue       # 右上「Fork on GitHub」角標
│   │   ├── Go-Admin/                    # 專案宣傳塊
│   │   │   ├── Doc/index.vue            # 文件導引
│   │   │   ├── Donate/index.vue         # 贊助 QR
│   │   │   └── Git/index.vue            # git 連結
│   │   ├── Hamburger/index.vue          # 漢堡按鈕(摺疊側欄)— 有 spec(Phase 0 skip)
│   │   ├── HeaderSearch/index.vue       # 全域搜尋(fuse.js 模糊比對選單)
│   │   ├── IconSelect/                  # 圖示選擇器
│   │   │   ├── index.vue
│   │   │   └── requireIcons.js          # require.context 動態載 svg 列表
│   │   ├── ImageCropper/                # 頭像裁切元件
│   │   │   ├── index.vue
│   │   │   └── utils/
│   │   │       ├── data2blob.js         # dataURL → Blob
│   │   │       ├── effectRipple.js      # 按鈕水波紋
│   │   │       ├── language.js          # i18n 文字
│   │   │       └── mimes.js             # mimeType 對應表
│   │   ├── MDinput/index.vue            # Material Design 風 input
│   │   ├── MiniArea/index.vue           # 小型面積圖
│   │   ├── MiniBar/index.vue            # 小型柱狀圖
│   │   ├── MiniProgress/index.vue       # 小型進度條
│   │   ├── Pagination/index.vue         # 分頁元件(graphify hub,使用率高)
│   │   ├── PanThumb/index.vue           # 旋轉縮圖卡(個人資料用)
│   │   ├── RankList/index.vue           # 排行榜列表
│   │   ├── RightPanel/index.vue         # 右側面板抽屜(主題設定入口)
│   │   ├── Screenfull/index.vue         # 全螢幕切換按鈕(screenfull lib)
│   │   ├── Share/DropdownMenu.vue       # 分享選單下拉
│   │   ├── SvgIcon/index.vue            # SVG 圖示元件 — 有 spec(Phase 0 skip)
│   │   ├── ThemePicker/index.vue        # 主題色選擇器(動態替換 element 色)
│   │   ├── TopNav/index.vue             # 頂部導覽列(替代 Sidebar 的橫向版)
│   │   ├── Trend/index.vue              # 趨勢箭頭(↑↓)
│   │   ├── Upload/                      # 圖片上傳系列
│   │   │   ├── SingleImage.vue          # 單圖上傳
│   │   │   ├── SingleImage2.vue         # 單圖上傳(預覽變體)
│   │   │   └── SingleImage3.vue         # 單圖上傳(裁切變體)
│   │   ├── UploadExcel/index.vue        # Excel 拖拉上傳 → 解析
│   │   └── layout.vue                   # 通用 layout wrapper(個別頁用)
│   │
│   ├── directive/                       # 自訂 Vue 指令
│   │   ├── el-drag-dialog/              # v-el-drag-dialog(對話框可拖移)
│   │   │   ├── drag.js                  # 滑鼠拖移核心
│   │   │   └── index.js                 # directive 註冊
│   │   ├── el-table/                    # v-el-table-adaptive(表格高度自適應)
│   │   │   ├── adaptive.js
│   │   │   └── index.js
│   │   ├── permission/                  # v-permission(按權限隱藏元素)
│   │   │   ├── index.js
│   │   │   ├── permisaction.js          # action 級權限變體
│   │   │   └── permission.js            # role 級權限變體
│   │   ├── sticky.js                    # v-sticky(滾動黏著)
│   │   └── waves/                       # v-waves(Material 點擊水波紋)
│   │       ├── index.js
│   │       ├── waves.css
│   │       └── waves.js
│   │
│   ├── filters/
│   │   └── index.js                     # 全域 filters(時間格式、千分位等)
│   │
│   ├── icons/                           # SVG 圖示集 + svg-sprite-loader
│   │   ├── index.js                     # require.context 載所有 svg → 註冊 SvgIcon
│   │   ├── svg/                         # 130 餘個業務 SVG(menu / 動作 / 狀態)
│   │   └── svgo.yml                     # SVGO 壓縮設定(npm run svgo)
│   │
│   ├── layout/                          # 主框架
│   │   ├── BasicLayout.vue              # 基礎 layout(簡化頁面用)
│   │   ├── components/
│   │   │   ├── AppMain.vue              # 主內容區(<router-view />)
│   │   │   ├── Navbar.vue               # 頂部導覽(漢堡按鈕、麵包屑、頭像、setting)
│   │   │   ├── Settings/index.vue       # 主題設定面板
│   │   │   ├── Sidebar/                 # 側邊欄子元件
│   │   │   │   ├── FixiOSBug.js         # iOS Safari 滾動 bug 修補
│   │   │   │   ├── Item.vue             # 單個選單項
│   │   │   │   ├── Link.vue             # 外部連結 / 內部跳轉切換
│   │   │   │   ├── Logo.vue             # 側欄頂部 logo
│   │   │   │   ├── SidebarItem.vue      # 遞迴渲染選單樹
│   │   │   │   └── index.vue            # 側欄入口
│   │   │   ├── TagsView/                # 已開分頁(tags 標籤頁)
│   │   │   │   ├── ScrollPane.vue       # 橫向滾動容器
│   │   │   │   ├── TagsView.vue         # 舊命名(疑似 dead)
│   │   │   │   └── index.vue            # 主元件
│   │   │   └── index.js                 # layout components barrel export
│   │   ├── index.vue                    # 主 layout(Navbar+Sidebar+TagsView+AppMain)
│   │   └── mixin/
│   │       └── ResizeHandler.js         # window resize → 切手機 / 桌面模式
│   │
│   ├── router/
│   │   └── index.js                     # vue-router 4 設定 + 靜態路由
│   │
│   ├── store/                           # Vuex 4
│   │   ├── getters.js                   # 全域 getters(token / sidebar / userId 等扁平導出)
│   │   ├── index.js                     # createStore + modules 註冊
│   │   └── modules/
│   │       ├── app.js                   # sidebar 摺疊 / device / size
│   │       ├── errorLog.js              # 全域錯誤日誌收集(配 ErrorLog 元件)
│   │       ├── permission.js            # 動態路由產生(根據 user.roles 過濾選單)
│   │       ├── settings.js              # 主題與 layout 設定持久化
│   │       ├── system.js                # 系統參數(從後端拉)
│   │       ├── tagsView.js              # 已開分頁狀態(visitedViews / cachedViews)
│   │       └── user.js                  # 使用者狀態(token/roles/permissions/login/logout)
│   │
│   ├── styles/                          # 全域樣式
│   │   ├── admin.css                    # 管理介面通用樣式編譯產物
│   │   ├── admin.min.css                # 同上,壓縮版
│   │   ├── admin.scss                   # 管理介面樣式原始檔
│   │   ├── btn.scss                     # 按鈕樣式覆寫
│   │   ├── element-plus.scss            # Element Plus 樣式覆寫
│   │   ├── element-theme.css            # 自訂 Element 主題編譯產物
│   │   ├── element-theme.js             # 主題切換期 inject CSS 邏輯
│   │   ├── element-variables.module.scss # CSS Modules 用變數導出
│   │   ├── element-variables.scss       # Element 變數覆寫(主色等)
│   │   ├── index.scss                   # 樣式總入口
│   │   ├── mixin.scss                   # SCSS mixin 集合
│   │   ├── sidebar.scss                 # 側邊欄樣式
│   │   ├── transition.scss              # 全域動畫
│   │   ├── variables.css                # CSS 變數編譯產物
│   │   ├── variables.min.css            # 同上,壓縮版
│   │   ├── variables.module.scss        # CSS Modules 變數導出
│   │   └── variables.scss               # 全域 SCSS 變數
│   │
│   ├── utils/                           # 工具函式(測試策略 §4 第一優先層)
│   │   ├── auth.js                      # token 存取(cookie wrapper)
│   │   ├── costum.js                    # 商業客製函式(命名疑似 typo "custom")
│   │   ├── dialog.js                    # 全域 dialog 包裝
│   │   ├── error-log.js                 # 全域 errorHandler 註冊
│   │   ├── eventbus.js                  # mitt 事件匯流排(Vue 3 替代 $emit/$on)
│   │   ├── generator/                   # 程式碼產生器執行端
│   │   │   ├── config.js                # 產生器設定
│   │   │   ├── css.js                   # CSS 樣板生成
│   │   │   ├── drawingDefalut.js        # 表單拖拉預設 schema(typo "default")
│   │   │   ├── html.js                  # HTML 樣板生成
│   │   │   ├── icon.json                # 產生器可用圖示清單
│   │   │   ├── index.js                 # 主 generator 入口
│   │   │   ├── js.js                    # JS 樣板生成
│   │   │   └── render.js                # 產生結果渲染至預覽
│   │   ├── get-page-title.js            # route.meta.title → document.title
│   │   ├── index.js                     # 大雜燴(含 time_str use-before-declare bug)
│   │   ├── open-window.js               # window.open 包裝(避免 popup blocker)
│   │   ├── permission.js                # 權限判斷(checkPermission / hasRole)
│   │   ├── request.js                   # axios 實例 + 攔截器
│   │   ├── scroll-to.js                 # 平滑捲動
│   │   ├── storage.js                   # localStorage wrapper
│   │   ├── validate.js                  # 驗證工具(URL/email/密碼;有 spec)
│   │   └── zipdownload.js               # 後端 base64 → 觸發下載 zip
│   │
│   ├── vendor/                          # 第三方移植
│   │   ├── Export2Excel.js              # 前端產生 Excel(xlsx 包裝)
│   │   └── Export2Zip.js                # 前端打包 zip(jszip 包裝)
│   │
│   └── views/                           # 頁面
│       ├── admin/                       # /admin/* 頁面群
│       │   ├── dict/
│       │   │   ├── data.vue             # 字典資料管理頁
│       │   │   └── index.vue            # 字典類型管理頁
│       │   ├── sys-api/index.vue        # 系統 API 列表頁
│       │   ├── sys-config/
│       │   │   ├── index.vue            # 系統參數列表
│       │   │   └── set.vue              # 系統參數編輯
│       │   ├── sys-dept/index.vue       # 部門管理頁
│       │   ├── sys-login-log/index.vue  # 登入日誌頁
│       │   ├── sys-menu/index.vue       # 選單管理頁
│       │   ├── sys-oper-log/index.vue   # 操作日誌頁
│       │   ├── sys-post/index.vue       # 職位管理頁
│       │   ├── sys-role/index.vue       # 角色管理頁
│       │   └── sys-user/index.vue       # 使用者管理頁
│       ├── dashboard/                   # 儀表板
│       │   ├── admin/                   # 管理員 dashboard
│       │   │   ├── components/
│       │   │   │   ├── BarChart.vue
│       │   │   │   ├── LineChart.vue
│       │   │   │   ├── PanelGroup.vue   # 上方四個統計卡
│       │   │   │   ├── PieChart.vue
│       │   │   │   ├── RaddarChart.vue  # 雷達圖(typo "Radar")
│       │   │   │   ├── TodoList/
│       │   │   │   │   ├── Todo.vue
│       │   │   │   │   ├── index.scss
│       │   │   │   │   └── index.vue
│       │   │   │   └── mixins/resize.js
│       │   │   └── index.vue            # admin dashboard 主頁
│       │   ├── editor/index.vue         # 編輯人員 dashboard
│       │   └── index.vue                # dashboard 入口(依角色分派)
│       ├── dev-tools/                   # 開發工具
│       │   ├── build/index.vue          # 表單建構器(拖拉式)
│       │   ├── gen/                     # 程式碼產生器 UI
│       │   │   ├── basicInfoForm.vue    # 基本資訊表單
│       │   │   ├── editTable.vue        # 表格欄位設定
│       │   │   ├── genInfoForm.vue      # 產生選項表單
│       │   │   ├── importTable.vue      # 從資料庫匯入表格
│       │   │   └── index.vue            # 主入口
│       │   └── swagger/index.vue        # Swagger 文件嵌入頁
│       ├── error-page/
│       │   ├── 401.vue                  # 401 未授權頁
│       │   └── 404.vue                  # 404 頁
│       ├── excel/                       # Excel 匯入匯出 demo
│       │   ├── components/
│       │   │   ├── AutoWidthOption.vue  # 自動欄寬選項
│       │   │   ├── BookTypeOption.vue   # 檔案格式選項(xlsx/xls/csv)
│       │   │   └── FilenameOption.vue   # 檔名選項
│       │   └── upload-excel.vue         # Excel 上傳 demo 頁
│       ├── log/index.vue                # 日誌統合頁
│       ├── login/                       # 登入流程
│       │   ├── auth-redirect.vue        # OAuth 跳轉中繼頁
│       │   ├── components/SocialSignin.vue # 第三方登入按鈕群
│       │   └── index.vue                # 主登入頁
│       ├── profile/                     # 個人資料
│       │   ├── components/
│       │   │   ├── Account.vue          # 帳號 tab
│       │   │   ├── Activity.vue         # 活動紀錄 tab
│       │   │   ├── Timeline.vue         # 時間軸 tab
│       │   │   └── UserCard.vue         # 左上個人卡片
│       │   ├── index.vue                # profile 主入口
│       │   ├── resetPwd.vue             # 改密碼
│       │   ├── userAvatar.vue           # 頭像上傳(用 ImageCropper)
│       │   └── userInfo.vue             # 個人資訊編輯
│       ├── redirect/index.vue           # 內部 redirect 中繼(刷新分頁時用)
│       ├── schedule/                    # 排程任務
│       │   ├── index.vue                # 任務列表
│       │   └── log.vue                  # 執行日誌
│       └── sys-tools/
│           └── monitor.vue              # 伺服器監控頁(配 api/monitor/server.js)
│
├── tests/                               # Jest 單元測試(測試策略 spec 主要對象)
│   └── unit/
│       ├── components/
│       │   ├── Hamburger.spec.js        # Hamburger 測試(Phase 0 預定 skip:test-utils 1.x API)
│       │   └── SvgIcon.spec.js          # SvgIcon 測試(Phase 0 預定 skip:propsData 等 1.x API)
│       └── utils/
│           ├── formatTime.spec.js       # formatTime 測試(Phase 0 skip:依賴 time_str 源碼 bug)
│           ├── parseTime.spec.js        # parseTime 測試(同上)
│           └── validate.spec.js         # validate 測試(預期 pass,保留)
│
├── x_fork.branch-origin.md              # fork 由來說明(分支對照備忘)
├── x_fork.graphify-20260506.md          # graphify 整合 session 紀錄
└── x_fork.tree-20260506.md              # 本檔(檔案樹註解)
```

---

## 補充說明

**幾個重要慣例**:

- 路徑別名 `@/` = `src/`(在 `jest.config.js` / `vue.config.js` / `jsconfig.json`
  各自登記了一次,改別名要三處同步)。
- `index.vue` 在每個 `views/` 子目錄裡是該頁的進入點,在 `components/` 子目錄
  裡是該元件的進入點。Vue 2 慣例,Vue 3 後可改用 `<script setup>` 但本專案
  尚未統一遷移。
- `costum.js` / `drawingDefalut.js` / `RaddarChart.vue` 三處拼字 typo
  屬上游既有,基於 constitution 原則 V(Incremental Migration)不主動修。
- `x_fork.*` 開頭的檔案都是這份 fork 的 meta 紀錄,不影響任何程式邏輯。
- jest 既有的 `collectCoverageFrom` 是 `src/utils/**` + `src/components/**`
  並排除 `auth.js` / `request.js`(覆蓋率不計,但測試策略 spec 仍考量是否
  應補測)。

**最常被引用的 god nodes**(來自 `graphify-out/GRAPH_REPORT.md`):

| 節點 | 邊數 | 備註 |
|---|---|---|
| `go-admin Project` | 21 | 概念節點,代表整個專案 |
| `data()` | 15 | 跨多個 community 的橋(高 betweenness 0.083) |
| `getList()` | 14 | CRUD 列表頁通用方法,6 條為推論邊 |
| `handleDelete()` | 12 | CRUD 刪除通用方法,6 條為推論邊 |
| `buildAttributes()` | 9 | 表單建構器內部 |
| `created()` | 9 | Options API 生命週期(多頁共用名) |
| `reset()` | 9 | 表單重置通用方法 |
| `handleQuery()` | 9 | CRUD 查詢通用方法 |
| `handleUpdate()` | 9 | CRUD 更新通用方法 |
| `if()` | 8 | 控制流節點(graphify AST 雜訊,可忽略) |

讀程式碼建議從 `src/permission.js` → `store/modules/permission.js` →
`api/admin/sys-menu.js` 這條動態路由鏈開始,再往各 `views/admin/sys-*` 頁
擴散,可快速建立心智模型。

---

*本檔案於 2026-05-08 由 Claude Code 依 `tree` 輸出生成,日期 `20260506`
沿用 fork 的 snapshot 命名慣例(對齊 `x_fork.graphify-20260506.md`)。*
