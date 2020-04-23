const github = require('@actions/github');

async function gitPRComment(message) {
  const { REPO_TOKEN } = process.env;
  if (REPO_TOKEN) {
    const request = {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: github.context.payload.pull_request.number,
    };
    request.body = message;
    const client = new github.GitHub(REPO_TOKEN);

    await client.issues.create({ ...context.repo, title: 'New issue!', body: message });
  }
}

module.exports.gitPRComment = gitPRComment;
