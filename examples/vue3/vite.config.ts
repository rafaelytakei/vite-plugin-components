import path from 'path'
import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteComponents, { VantResolver } from 'vite-plugin-components'
import Markdown from 'vite-plugin-md'
import Icons, { ViteIconsResolver } from 'vite-plugin-icons'
// @ts-expect-error
import SVG from 'vite-plugin-vue-svg'

const config: UserConfig = {
  resolve: {
    alias: {
      '/~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown(),
    SVG(),
    Icons(),
    ViteComponents({
      extensions: ['vue', 'md', 'svg'],
      directoryAsNamespace: true,
      globalComponentsDeclaration: true,
      globalNamespaces: ['global'],
      importPathTransform: path => path.endsWith('.svg') ? `${path}?component` : undefined,
      customLoaderMatcher: path => path.endsWith('.md'),
      customComponentResolvers: [
        (name) => {
          if (name === 'MyCustom')
            return '/src/CustomResolved.vue'
        },
        VantResolver(),
        ViteIconsResolver({
          componentPrefix: 'i',
        }),
      ],
    }),
  ],
  build: {
    sourcemap: true,
  },
}

export default config
