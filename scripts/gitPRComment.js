const github = require('@actions/github');
const core = require('@actions/core');

function gitPRComment() {
  const { REPO_TOKEN, INPUT_MESSAGE } = process.env;
  const message = core.getInput('message');

  if (REPO_TOKEN) {
    const request = {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: github.context.payload.pull_request.number,
    };
    request.body = message;
    const client = new github.GitHub(REPO_TOKEN);
    client.pulls.update(request);
  }
  console.log('message: ' + message);
  console.log('INPUT_MESSAGE: ' + INPUT_MESSAGE);
}

gitPRComment();
// module.exports.gitPRComment = gitPRComment;
