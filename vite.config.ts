import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import vue from '@vitejs/plugin-vue'
// import { VitePluginNode } from 'vite-plugin-node'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: process.env.NODE_ENV === 'test'
        // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
        ? undefined
        : {},
    }),
    // ...VitePluginNode({
    //   // NodeJs 原生请求适配器
    //   // 支持'express', 'nest', 'koa' 和 'fastify',
    //   adapter: 'nest',

    //   // 项目入口文件
    //   appPath: 'server/src/main.ts',

    //   // 在项目入口文件中导出的名字
    //   exportName: 'appServer',

    //   // 编译方式: esbuild 和 swc,
    //   // 默认 esbuild. 但 esbuild 不支持 'emitDecoratorMetadata'
    //   // 使用swc需要安装 `@swc/core`
    //   tsCompiler: 'swc',
    // }),
  ],
})
