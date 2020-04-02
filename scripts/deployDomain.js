const github = require('@actions/github');

const fqdn = subdomain => `${subdomain}.surge.sh/`;

const generateSubdomain = () => {
  const { version } = require('../lerna.json');
  const { GITHUB_REF } = process.env;
  const branchName = GITHUB_REF.split('/').pop();
  console.log('branchName:', branchName);
  const postfix = !branchName.startsWith('release') ? branchName : version;
  return `https://rich-content-${postfix.replace(/(\.)|(\/)/g, '-')}`;
};

async function run() {
  const { REPO_TOKEN } = process.env;
  const request = {
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: github.context.payload.pull_request.number,
  };
  const bodyPrefix = 'Click below to open app:';
  const domain = fqdn(generateSubdomain());
  console.log('Domain:', domain);
  request.body = bodyPrefix.concat('\n', domain);

  const client = new github.GitHub(REPO_TOKEN);
  await client.pulls.update(request);
}

run();
