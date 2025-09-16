const Vue = require('vue')

console.log('Vue loaded successfully')
console.log('Vue version:', Vue.version)

// 测试createApp是否可用
if (Vue.createApp) {
    console.log('Vue 3 createApp is available')
    const app = Vue.createApp({
        template: '<div>Hello Vue 3!</div>'
    })
    console.log('Vue 3 app created successfully:', typeof app)
} else {
    console.log('Vue 2 detected, createApp not available')
}
