/* eslint-disable no-console */
const github = require('@actions/github');

async function createGitPRComment() {
  const { REPO_TOKEN } = process.env;
  if (REPO_TOKEN) {
    const request = {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: github.context.payload.pull_request.number,
    };
    request.body = 'message';
    const client = new github.GitHub(REPO_TOKEN);
    return await client.pulls.create(request);
  }
}

console.log(createGitPRComment());
