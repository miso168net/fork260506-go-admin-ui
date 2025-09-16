import { createApp } from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import ElementPlus from 'element-plus'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import '@/styles/admin.scss'

import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'

import { getDicts } from '@/api/admin/dict/data'
import { getItems, setItems } from '@/api/table'
import { getConfigKey } from '@/api/admin/sys-config'
import { parseTime, resetForm, addDateRange, selectDictLabel, /* download,*/ selectItemsLabel } from '@/utils/costum'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

// Vite SVG icons 支持
import 'virtual:svg-icons-register'
// import Viser from 'viser-vue'

import * as filters from './filters' // global filters

import Pagination from '@/components/Pagination'
import BasicLayout from '@/layout/BasicLayout'

// VueParticles已经被移除，使用替代方案
// import VueParticles from 'vue-particles'

import '@/utils/dialog'

// 创建Vue 3应用实例
const app = createApp(App)

// 使用Vue Router 4
app.use(router)

// 使用Vuex 4
app.use(store)

// 使用Element Plus
app.use(ElementPlus, {
  size: Cookies.get('size') || 'default' // Element Plus默认大小
})

// 使用Vue Codemirror
app.use(VueCodemirror)

// 使用权限指令
app.use(permission)

// 使用VueDND
import VueDND from 'awe-dnd'
app.use(VueDND)

import 'remixicon/fonts/remixicon.css'

// 全局方法挂载到app.config.globalProperties
app.config.globalProperties.getDicts = getDicts
app.config.globalProperties.getItems = getItems
app.config.globalProperties.setItems = setItems
app.config.globalProperties.getConfigKey = getConfigKey
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectItemsLabel = selectItemsLabel

// 全局组件注册
app.component('AppPagination', Pagination)
app.component('BasicLayout', BasicLayout)

// Element Plus消息方法
app.config.globalProperties.msgSuccess = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'success' })
}

app.config.globalProperties.msgError = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'error' })
}

app.config.globalProperties.msgInfo = function(msg) {
  this.$message.info(msg)
}

console.info(`欢迎使用go-admin，谢谢您对我们的支持，在使用过程中如果有什么问题，
请访问https://github.com/go-admin-team/go-admin 或者
 https://github.com/go-admin-team/go-admin-ui 向我们反馈，
 谢谢！`)

// register global utility filters
Object.keys(filters).forEach(key => {
  app.config.globalProperties.$filters = app.config.globalProperties.$filters || {}
  app.config.globalProperties.$filters[key] = filters[key]
})

app.config.productionTip = false

// 挂载应用
app.mount('#app')
