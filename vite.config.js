const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')
const { createSvgIconsPlugin } = require('vite-plugin-svg-icons')
const path = require('path')

// https://vitejs.dev/config/
module.exports = defineConfig({
    plugins: [
        vue(),
        createSvgIconsPlugin({
            // 配置路径在你的src里的svg存放文件
            iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
            // 执行icon name的格式
            symbolId: 'icon-[name]',
        })
    ],
    root: process.cwd(),
    base: '/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
        port: 9527,
        open: false
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        // 消除打包大小超过500kb警告
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
            input: 'index.html',
            output: {
                // 静态资源分类打包
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
            }
        }
    },
    define: {
        // 修复Vue 3的一些兼容性问题
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    },
    // 注意：不要在这里通过 additionalData 全局注入 variables.scss，
    // 否则会在处理 variables.scss 自身时产生自我导入导致的循环加载错误。
    // 统一做法：各需要使用变量的 scss/SFC 自行 @import '@/styles/variables.scss'
    // 或者只在 main.js 全局引入样式文件（不用于变量传递）。
    css: {
        preprocessorOptions: {
            scss: {
                // 如需全局mixin可在此注入独立且不会被自身再次引用的文件。
                // additionalData: `@import "@/styles/mixin.scss";`
            }
        }
    }
})
