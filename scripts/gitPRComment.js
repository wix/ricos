const github = require('@actions/github');

function gitPRComment() {
  const { REPO_TOKEN, message } = process.env;
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
  console.log(message);
}

gitPRComment();
// module.exports.gitPRComment = gitPRComment;
