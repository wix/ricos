const { gitPRComment } = require('../gitPRComment');
const { EXAMPLES_TO_DEPLOY, fqdn, generateSubdomain } = require('./deployUtils');

const generateMessage = () => {
  let message = 'Deploy examples (Click below to open examples):';
  EXAMPLES_TO_DEPLOY.map(example => {
    const domain = fqdn(generateSubdomain(example.name, false));
    return (message = message.concat(`\n${example.name}: https://${domain}`));
  });
  return message;
};

async function run() {
  const message = generateMessage();
  gitPRComment(message, 'Deploy examples');
}

run();
