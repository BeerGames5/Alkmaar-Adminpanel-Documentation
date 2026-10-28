import { defineConfig } from 'vitepress';

// Publishing to https://<user>.github.io/<repo>/ ? Then `base` must be '/<repo>/'.
// Using a custom domain (docs.yourdomain.com)? Set base to '/' and add a CNAME
// file in docs/public/.
const base = process.env.DOCS_BASE || '/arp-adminpanel-docs/';

export default defineConfig({
    title: 'Alkmaar Admin Panel',
    description: 'Admin panel for ESX, QBCore and Qbox — installation, configuration and support.',
    lang: 'en-US',
    base,
    cleanUrls: true,
    lastUpdated: true,

    head: [
        ['meta', { name: 'theme-color', content: '#3b82f6' }],
        ['meta', { property: 'og:title', content: 'Alkmaar Admin Panel' }],
        ['meta', { property: 'og:description', content: 'Documentation for the Alkmaar Admin Panel.' }],
    ],

    themeConfig: {
        search: { provider: 'local' },

        nav: [
            { text: 'Installation', link: '/installation' },
            { text: 'Configuration', link: '/configuration' },
            { text: 'Commands', link: '/commands' },
            { text: 'Support', link: '/troubleshooting' },
        ],

        sidebar: [
            {
                text: 'Getting started',
                items: [
                    { text: 'Introduction', link: '/' },
                    { text: 'Installation', link: '/installation' },
                    { text: 'Licence', link: '/licence' },
                ],
            },
            {
                text: 'Usage',
                items: [
                    { text: 'Commands', link: '/commands' },
                    { text: 'Staff & permissions', link: '/permissions' },
                    { text: 'Browser panel', link: '/browser-panel' },
                ],
            },
            {
                text: 'Configuration',
                items: [
                    { text: 'Overview', link: '/configuration' },
                    { text: 'Integrations', link: '/integrations' },
                    { text: 'Discord logs', link: '/discord' },
                ],
            },
            {
                text: 'Help',
                items: [
                    { text: 'Troubleshooting', link: '/troubleshooting' },
                ],
            },
        ],

        editLink: false,

        footer: {
            message: 'Alkmaar Admin Panel',
            copyright: '© BeerGames5',
        },

        docFooter: { prev: 'Previous', next: 'Next' },
    },
});
