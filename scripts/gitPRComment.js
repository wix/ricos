const github = require('@actions/github');

async function gitPRComment(message, callback) {
  const { REPO_TOKEN } = process.env;
  const request = {
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: github.context.payload.pull_request.number,
  };
  request.body = message;
  const client = new github.GitHub(REPO_TOKEN);
  await updateComment(client, request, callback);
}
function updateComment(client, request, callback) {
  client.pulls.update(request);
  callback?.();
}

module.exports.gitPRComment = gitPRComment;
