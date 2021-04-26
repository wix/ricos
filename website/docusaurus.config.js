module.exports = {
  title: 'Ricos',
  tagline: 'A supercharged rich content framework with an extensible plugin system',
  url: 'https://wix.github.io/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'wix',
  projectName: 'ricos',
  themeConfig: {
    // https://docsearch.algolia.com/docs/faq/#can-i-share-the-apikey-in-my-repo
    algolia: {
      apiKey: '1c2337fcafb4c304a30def6efc0b441a',
      indexName: 'rich-content',
      algoliaOptions: { facetFilters: ['type:content'] },
    },
    colorMode: {
      defaultMode: 'dark',
    },
    navbar: {
      title: 'Ricos',
      logo: {
        alt: 'Ricos Logo',
        src: 'img/RICOS black.png',
        srcDark: 'img/RICOS white.png',
      },
      items: [
        {
          to: 'docs/ricos/quick-start',
          activeBasePath: 'docs',
          label: 'Getting Started',
          position: 'left',
        },
        {
          to: 'docs/ricos/ricos-api',
          activeBasePath: 'docs',
          label: 'API',
          position: 'left',
        },
        {
          to: 'docs/dev/plugin_structure',
          activeBasePath: 'docs',
          label: 'For Developers',
          position: 'left',
        },
        {
          href: 'https://github.com/wix/ricos',
          label: 'GitHub',
          position: 'right',
        },
      ],
      hideOnScroll: true,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Introduction',
              to: 'docs/ricos/ricos-intro',
            },
            {
              label: 'Quick Start',
              to: 'docs/ricos/quick-start',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href: 'https://wix.slack.com/archives/C8QHV6UM9',
            },
            {
              label: 'Asana',
              href: 'https://app.asana.com/0/1160368252184537/board',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/wix/ricos',
            },
            {
              label: 'Changelog',
              href: 'https://github.com/wix/ricos/blob/master/CHANGELOG.md',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Wix`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/vsDark'),
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/wix/ricos/edit/master/website',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
  plugins: ['docusaurus-plugin-sass'],
};
