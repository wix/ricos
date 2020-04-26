const github = require('@actions/github');

// async function gitPRComment(message, id) {
//   const { REPO_TOKEN } = process.env;
//   if (REPO_TOKEN) {
//     const request = {
//       owner: github.context.repo.owner,
//       repo: github.context.repo.repo,
//       pull_number: github.context.payload.pull_request.number,
//     };
//     request.body = message;
//     const client = new github.GitHub(REPO_TOKEN);
//     await client.pulls.update(request);
//   }
// }

async function gitPRComment(message) {
  // const message = core.getInput('message');
  // const github_token = core.getInput('GITHUB_TOKEN');
  const { REPO_TOKEN } = process.env;
  if (REPO_TOKEN) {
    const context = github.context;
    const pull_request_number = context.payload.pull_request.number;

    const octokit = new github.GitHub(REPO_TOKEN);
    await octokit.issues.createComment({
      ...context.repo,
      issue_number: pull_request_number,
      body: message,
    });
  }
}

module.exports.gitPRComment = gitPRComment;
