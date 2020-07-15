const github = require('@actions/github');

async function gitPRComment(message, header) {
  const { REPO_TOKEN } = process.env;
  if (REPO_TOKEN) {
    const context = github.context;
    const issue_number = context.payload.pull_request.number;

    const octokit = new github.GitHub(REPO_TOKEN);
    const response = await octokit.issues.listComments({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number,
    });

    const allComments = response.data;
    const comment = allComments.find(
      comment => comment.user.login === 'github-actions[bot]' && comment.body.includes(header)
    );
    if (comment) {
      await octokit.issues.updateComment({
        ...context.repo,
        issue_number,
        comment_id: comment.id,
        body: message,
      });
    } else {
      await octokit.issues.createComment({
        ...context.repo,
        issue_number,
        body: message,
      });
    }
  }
}

module.exports.gitPRComment = gitPRComment;
