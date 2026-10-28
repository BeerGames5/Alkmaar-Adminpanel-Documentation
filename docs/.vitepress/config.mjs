import { defineConfig } from 'vitepress';

// Publishing to https://<user>.github.io/<repo>/ ? Then `base` must be '/<repo>/'
// and it is case sensitive — it has to match the repository name exactly.
// Using a custom domain (docs.yourdomain.com)? Set base to '/' and add a CNAME
// file in docs/public/.
const base = process.env.DOCS_BASE || '/Alkmaar-Adminpanel-Documentation/';
const hostname = process.env.DOCS_HOST || 'https://beergames5.github.io';

export default defineConfig({
    title: 'Alkmaar Admin Panel',
    description: 'Documentation for the Alkmaar Admin Panel: a FiveM admin panel for ESX, QBCore and Qbox, with an in-game panel and a browser panel.',
    lang: 'en-US',
    base,
    cleanUrls: true,
    lastUpdated: true,

    // Generates sitemap.xml so search engines can find every page.
    sitemap: { hostname: hostname + base },

    head: [
        ['meta', { name: 'theme-color', content: '#3b82f6' }],
        ['meta', { name: 'keywords', content: 'fivem admin panel, esx admin panel, qbcore admin panel, qbox, fivem moderation, admin menu' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: 'Alkmaar Admin Panel' }],
        ['meta', { property: 'og:title', content: 'Alkmaar Admin Panel — FiveM admin panel documentation' }],
        ['meta', { property: 'og:description', content: 'Install, configure and troubleshoot the Alkmaar Admin Panel for ESX, QBCore and Qbox.' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
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
