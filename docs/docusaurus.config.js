module.exports = {
  title: 'RiCoS',
  tagline: 'A super charged rich text editor with an extensible plugin system',
  url: 'https://wix-incubator.github.io/',
  baseUrl: '/rich-content/',
  favicon: 'img/favicon.ico',
  organizationName: 'wix-incubator',
  projectName: 'rich-content',
  themeConfig: {
    navbar: {
      title: 'RiCoS',
      logo: {
        alt: 'Wix Rich Content Logo',
        src: 'img/rce.svg',
        srcDark: 'img/rceDark.svg',
      },
      links: [
        {
          to: 'docs/intro',
          activeBasePath: 'docs',
          label: 'Getting Started',
          position: 'left',
        },
        {
          to: 'docs/rce_api/RichContentEditorApi',
          activeBasePath: 'docs',
          label: 'API',
          position: 'left',
        },
        {
          to: 'docs/plugin-development-guidelines/general',
          activeBasePath: 'docs',
          label: 'For Developers',
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
              to: 'docs/intro',
            },
            //{
            //label: 'Quick Start',
            //to: 'docs/quick-start',
            //},
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
              label: 'GitHub for Plugins',
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
    defaultDarkMode: false,
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: ['docusaurus-plugin-sass'],
};
