import SvgIcon from '@/components/SvgIcon/index.vue'

// Vue 3 注册函数，供 main.js 调用
export function registerSvgIcon(app) {
  app.component('svg-icon', SvgIcon)
}
