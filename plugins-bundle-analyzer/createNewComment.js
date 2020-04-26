const github = require('@actions/github');

async function createNewPRComment() {
  const message = 'comparison bundles comment:\n';
  const { REPO_TOKEN } = process.env;
  if (REPO_TOKEN) {
    const context = github.context;
    const pull_request_number = context.payload.pull_request.number;

    const octokit = new github.GitHub(REPO_TOKEN);
    await octokit.issues.createComment({
      ...context.repo,
      issue_number: pull_request_number,
      comment_id: 'comparison',
      body: message,
    });
  }
}

createNewPRComment();
