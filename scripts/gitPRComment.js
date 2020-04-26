const github = require('@actions/github');

async function gitPRComment(message) {
  const { REPO_TOKEN } = process.env;
  const request = {
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: github.context.payload.pull_request.number,
  };
  request.body = message;
  const client = new github.GitHub(REPO_TOKEN);
  await client.issues.createComment(request);

  // console.log('client: ' + JSON.stringify(client, null, 2));
  // console.log('pulls: ' + JSON.stringify(client.pulls, null, 2));
  // console.log('issues: ' + JSON.stringify(client.issues, null, 2));
  // await client.pulls.update(request);
}

module.exports.gitPRComment = gitPRComment;
