module.exports = {
  title: 'Ricos',
  tagline: 'A super charged rich content framework with an extensible plugin system',
  url: 'https://wix-incubator.github.io/',
  baseUrl: '/rich-content/',
  favicon: 'img/favicon.ico',
  organizationName: 'wix-incubator',
  projectName: 'rich-content',
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
    },
    navbar: {
      title: 'Ricos',
      logo: {
        alt: 'Ricos Logo',
        src: 'img/rce.svg',
        srcDark: 'img/rceDark.svg',
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
          to: 'docs/plugin-development-guidelines/general',
          activeBasePath: 'docs',
          label: 'Developer Guidelines',
          position: 'left',
        },
        {
          href: 'https://github.com/wix-incubator/rich-content',
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
              href: 'https://github.com/wix-incubator/rich-content',
            },
            {
              label: 'Changelog',
              href: 'https://github.com/wix-incubator/rich-content/blob/master/CHANGELOG.md',
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
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
  plugins: ['docusaurus-plugin-sass'],
};
