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
      sidebar: [
        {
          label: 'Home',
          link: '/',
        },
        {
          label: 'Introduction',
          collapsed: false,
          items: [
            { label: 'Getting Started', link: '/guides/start' },
            { label: 'Concepts', link: '/guides/concepts' },
          ],
        },
        {
          label: 'Reference',
          collapsed: false,
          items: [
            {
              label: 'Common',
              collapsed: false,
              autogenerate: { directory: '/reference/common', collapsed: false },
            },
            {
              label: 'Type Guards',
              collapsed: false,
              autogenerate: { directory: '/reference/typeGuards', collapsed: false },
            },
          ],
        },
      ],
    }),
  ],
})
