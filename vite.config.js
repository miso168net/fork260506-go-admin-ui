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
  css: {
    preprocessorOptions: {
      scss: {
        // 全局scss变量
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
})
