const github = require('@actions/github');

const EXAMPLES_TO_DEPLOY = [
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

const fqdn = subdomain => `${subdomain}.surge.sh/`;

const generateSubdomain = exampleName => {
  const { version } = require('../lerna.json');
  const { GITHUB_REF } = process.env;
  const branchName = GITHUB_REF.split('/').pop();
  const postfix = !branchName.startsWith('release') ? branchName : version;
  return exampleName + `-${postfix.replace(/(\.)|(\/)/g, '-')}`;
};

async function run() {
  const { REPO_TOKEN } = process.env;
  const request = {
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: github.context.payload.pull_request.number,
  };
  const bodyPrefix = 'Click below to open app:';
  EXAMPLES_TO_DEPLOY.map(example => {
    const domain = fqdn(generateSubdomain(example.name));
    console.log(domain);
    return (request.body = bodyPrefix.concat('\n', domain));
  });
  const client = new github.GitHub(REPO_TOKEN);
  await client.pulls.update(request);
}

run();
