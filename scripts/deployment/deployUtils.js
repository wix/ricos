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

exports.generateSubdomain = (exampleName, isPullRequest) => {
  const { version } = require('../../lerna.json');
  const GITHUB_REF = isPullRequest
    ? github.context.payload.pull_request.head.ref
    : process.env.GITHUB_REF;

  const branchName = GITHUB_REF.split('/').pop();
  const postfix = !branchName.startsWith('release') ? branchName : version;
  return exampleName + `-${postfix.replace(/(\.)|(\/)/g, '-')}`;
};
