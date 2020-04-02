const { examples, fqdn, generateSubdomain } = require('./deployExamples');
const { gitPRComment } = require('./gitPRComment');

const generateMessage = () => {
  let message = 'Click below to open examples:';
  examples.map(example => {
    const domain = fqdn(generateSubdomain(example.name, true));
    return (message = message.concat(`\n${example.name}: https://${domain}`));
  });
  return message;
};

async function run() {
  const message = generateMessage();
  gitPRComment(message);
}

run();
