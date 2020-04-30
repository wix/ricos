const github = require('@actions/github');
// const core = require('@actions/core');

// function gitPRComment() {
//   const { REPO_TOKEN, MESSAGE } = process.env;
//   // const message = core.getInput('message');

//   if (REPO_TOKEN) {
//     const request = {
//       owner: github.context.repo.owner,
//       repo: github.context.repo.repo,
//       pull_number: github.context.payload.pull_request.number,
//     };
//     request.body = MESSAGE;
//     const client = new github.GitHub(REPO_TOKEN);
//     client.pulls.update(request);
//   }
//   console.log('message: ' + MESSAGE);
// }
async function gitPRComment(message, header) {
  const { REPO_TOKEN } = process.env;
  if (REPO_TOKEN) {
    const context = github.context;
    const pull_request_number = context.payload.pull_request.number;

    const octokit = new github.GitHub(REPO_TOKEN);
    const allComments = await octokit.issues.listComments({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: pull_request_number,
    });

    const comment = allComments.find(
      com => com.user.login === 'github-actions[bot]' && com.body.includes(header)
    );

    console.log('comment: ' + comment);
    console.log('allComments: ' + allComments);

    await octokit.issues.createComment({
      ...context.repo,
      issue_number: pull_request_number,
      body: message,
    });
  }
}

gitPRComment();
// module.exports.gitPRComment = gitPRComment;
