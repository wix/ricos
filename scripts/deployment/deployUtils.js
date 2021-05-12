const github = require('@actions/github');
exports.EXAMPLES_TO_DEPLOY = [
  {
    name: 'rich-content',
    path: 'examples/main',
  },
  {
    name: 'rich-content-storybook',
    path: 'examples/storybook',
    buildCmd: 'build-storybook -s public',
    dist: 'storybook-static',
  },
];

exports.fqdn = subdomain => `${subdomain}.surge.sh/`;

exports.generateSubdomain = exampleName => {
  const { version } = require('../../lerna.json');
  const isPullRequest = !!process.env.GITHUB_HEAD_REF;
  const branchName = isPullRequest
    ? process.env.GITHUB_HEAD_REF
    : process.env.GITHUB_REF.split('/')
        .slice(2)
        .join('/')
        .replace(/\//g, '-');

  const postfix = !branchName.startsWith('release') ? branchName : version;
  return exampleName + '-' + postfix.replace(/(\.)|(\/)/g, '-').replace(/^v(\d-)/, '$1');
};
