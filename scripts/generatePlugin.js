/* eslint-disable no-console */

const inquirer = require('inquirer');
const fs = require('fs');
const { version } = require('../lerna.json');
const execSync = require('child_process').execSync;
const CURR_DIR = process.cwd();
const exampleAppMainPath = `${CURR_DIR}/examples/main`;
const chalk = require('chalk');

const exec = cmd => execSync(cmd, { stdio: 'inherit' });
const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: 'plugin-choice',
    type: 'list',
    message: 'What plugin template would you like to generate?',
    choices: CHOICES,
  },
  {
    name: 'plugin-name',
    type: 'input',
    message: 'Enter Plugin name:',
    validate(input) {
      if (/^([a-z\-\d])+$/.test(input)) return true;
      else return 'Plugin name may only include lower letters and numbers.';
    },
  },
  {
    name: 'plugin-author',
    type: 'input',
    message: 'Enter Plugin author:',
    validate(input) {
      if (/^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$/.test(input)) return true;
      else return 'Plugin author name may only include lower letters.';
    },
  },
  {
    name: 'author-mail',
    type: 'input',
    message: 'Enter author mail:',
    validate(input) {
      if (/^\S+@\S+$/.test(input)) return true;
      else return 'Illegal mail address.';
    },
  },
];

inquirer.prompt(QUESTIONS).then(answers => {
  console.log(
    chalk.yellow(`Generating ${answers['plugin-name']} ${answers['plugin-choice']} 🤸‍♂`)
  );
  const pluginChoice = answers['plugin-choice'];
  const pluginName = answers['plugin-name'];
  const pluginAuthorName = answers['plugin-author'];
  const pluginAuthorMailAddress = answers['author-mail'];
  const templatePath = `${__dirname}/templates/${pluginChoice}`;
  const pluginPackagePath = `packages/plugin-${pluginName}`;

  fs.mkdirSync(`${CURR_DIR}/${pluginPackagePath}`);

  createDirectoryContents(templatePath, pluginPackagePath, {
    pluginName,
    pluginAuthorName,
    pluginAuthorMailAddress,
  });
  addPluginInExampleApp(pluginName);
});

function createDirectoryContents(templatePath, newProjectPath, pluginData) {
  const { pluginName, pluginAuthorName, pluginAuthorMailAddress } = pluginData;
  const filesToCreate = fs.readdirSync(templatePath);
  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    const stats = fs.statSync(origFilePath);
    const pluginNameMap = {
      yourPluginName: pluginName,
      YOUR_PLUGIN_NAME: pluginName.toUpperCase(),
      YourPluginName: pluginName.charAt(0).toUpperCase() + pluginName.slice(1),
      yourPluginVersion: version,
      pluginAuthorName,
      pluginAuthorMailAddress,
    };
    const fileName = file.replace(/yourPluginName|YourPluginName/g, name => pluginNameMap[name]);
    if (stats.isFile()) {
      console.log(chalk.cyan(`Creating ${fileName} file`));
      const contents = fs.readFileSync(origFilePath, 'utf8');
      const result = contents.replace(
        /yourPluginName|YOUR_PLUGIN_NAME|YourPluginName|yourPluginVersion|pluginAuthorName|pluginAuthorMailAddress/g,
        name => pluginNameMap[name]
      );
      const writePath = `${CURR_DIR}/${newProjectPath}/${fileName}`;
      fs.writeFileSync(writePath, result, 'utf8');
    } else if (stats.isDirectory()) {
      console.log(chalk.blue(`Creating ${fileName} directory`));
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${fileName}`);

      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`, pluginData);
    }
  });
}

function addPluginInExampleApp(pluginName) {
  console.log(`Installing ${pluginName}-plugin on the example app`);
  const filePath = `${exampleAppMainPath}/package.json`;
  fs.readFile(filePath, 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(chalk.red('Fail to read example app package.json', err));
    } else {
      const pckageJsonObj = JSON.parse(data);
      const newDependency = `wix-rich-content-plugin-${pluginName}`;
      pckageJsonObj.dependencies = {
        ...pckageJsonObj.dependencies,
        [newDependency]: version,
      };
      const packageJson = JSON.stringify(pckageJsonObj);
      fs.writeFile(filePath, packageJson, 'utf8', () => addPluginToExampleAppEditor(pluginName));
    }
  });
}

function addPluginToExampleAppEditor(pluginName) {
  const upperCasePluginName = pluginName.toUpperCase();
  const pluginNameStartWithUpperCase = pluginName.charAt(0).toUpperCase() + pluginName.slice(1);

  console.log(chalk.magenta(`Adding ${pluginName}-plugin to example app editor`));
  const editorPluginsPath = `${exampleAppMainPath}/shared/editor/EditorPlugins.jsx`;
  const importPluginBuffer = `import { create${pluginNameStartWithUpperCase}Plugin, ${upperCasePluginName}_TYPE } from 'wix-rich-content-plugin-${pluginName}';
    import 'wix-rich-content-plugin-${pluginName}/dist/styles.min.css';`;
  const createPluginsBuffer = `create${pluginNameStartWithUpperCase}Plugin,`;
  const configBuffer = `[${upperCasePluginName}_TYPE]: {},`;

  let data = fs.readFileSync(editorPluginsPath);
  data = importPluginBuffer + '\n' + data;
  const editorPluginsPos = data.indexOf('export const editorPlugins = [');
  data =
    data.substring(0, editorPluginsPos + 30) +
    '\n' +
    createPluginsBuffer +
    '\n' +
    data.substring(editorPluginsPos + 30);
  const configPos = data.indexOf('export const config = {');
  data =
    data.substring(0, configPos + 23) + '\n' + configBuffer + '\n' + data.substring(configPos + 23);
  fs.writeFileSync(editorPluginsPath, data, 'utf8');
  console.log(chalk.bold.green(`${pluginName}-plugin added successfully 🎉🎊🎉🎊`));
  exec(`npm i && npm run build && cd ${exampleAppMainPath} && npm run start`);
}
