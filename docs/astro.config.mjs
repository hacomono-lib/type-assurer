// eslint-disable-next-line import/extensions
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  integrations: [
    starlight({
      title: 'type-assurer',
      social: {
        github: 'https://github.com/hacomono-lib/type-assurer',
      },
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en-US'
        },
        'jp': {
          label: '日本語',
          lang: 'ja-JP'
        }
      },
      sidebar: [
        {
          label: 'Home',
          translations: { 'ja-JP': 'ホーム' },
          link: '/'
        },
        {
          label: 'Introduction',
          collapsed: false,
          items: [
            { label: 'Getting Started', link: '/guides/start', translations: { 'ja-JP': '始める' }, },
            { label: 'Concepts', link: '/guides/concepts', translations: { 'ja-JP': 'コンセプト' } },
          ]
        },
        {
          label: 'Reference',
          collapsed: false,
          items: [
            {
              label: 'Common',
              collapsed: false,
              autogenerate: { directory: '/reference/common', collapsed: false }
            },
            {
              label: 'Type Guards',
              collapsed: false,
              autogenerate: { directory: '/reference/typeGuards', collapsed: false }
            }
          ]
        }
      ]
    })
  ]
})
