/* eslint-disable no-console */

const inquirer = require('inquirer');
const getGitConfig = require('parse-git-config');

const fs = require('fs');
const { version } = require('../lerna.json');
const CURR_DIR = process.cwd();
const exampleAppMainPath = `${CURR_DIR}/examples/main`;
const chalk = require('chalk');

// const execSync = require('child_process').execSync;
// const exec = cmd => execSync(cmd, { stdio: 'inherit' });
const CHOICES = ['atomic-plugin'];

const gitConfig = getGitConfig.sync({ include: true, type: 'global' });

const { user = {} } = gitConfig;
const { name: gitName, email: gitEmail } = user;

const QUESTIONS = [
  {
    name: 'pluginChoice',
    type: 'list',
    message: 'What plugin template would you like to generate?',
    choices: CHOICES,
  },
  {
    name: 'pluginName',
    type: 'input',
    message: 'Enter Plugin name:',
    validate(input) {
      //hashtag, hash-tag, hash1-tag, hash-1-tag, hash-tag-1, hash-tag1
      if (/^[a-z]+[\d]*([-]{1}[a-z\d]+)*$/.test(input)) return true;
      else {
        // eslint-disable-next-line max-len
        return `Plugin name may only include lower letters, dashes in-between (-) and numbers. first letter cannot be a number.`;
      }
    },
  },
  {
    name: 'pluginAuthorName',
    type: 'input',
    message: 'Enter Plugin author:',
    validate(input) {
      if (/^[a-zA-Z]+[-'\s]?[a-zA-Z ]+$/.test(input)) return true;
      else return 'Plugin author name may only include lower letters.';
    },
    default: gitName,
  },
  {
    name: 'pluginAuthorMailAddress',
    type: 'input',
    message: 'Enter author mail:',
    validate(input) {
      if (/^\S+@\S+$/.test(input)) return true;
      else return 'Illegal mail address.';
    },
    default: gitEmail,
  },
];

inquirer.prompt(QUESTIONS).then(answers => {
  const { pluginChoice, pluginName, pluginAuthorName, pluginAuthorMailAddress } = answers;
  console.log(chalk.yellow(`Generating ${pluginName} ${pluginChoice} 🤸‍♂`));

  const templatePath = `${CURR_DIR}/packages/template-${pluginChoice}`;
  const pluginPackagePath = `packages/plugin-${pluginName}`;

  fs.mkdirSync(`${CURR_DIR}/${pluginPackagePath}`);

  createDirectoryContents(templatePath, pluginPackagePath, {
    pluginName,
    pluginAuthorName,
    pluginAuthorMailAddress,
  });
  addPluginToProject(exampleAppMainPath, pluginName);
});

function createDirectoryContents(templatePath, newProjectPath, pluginData) {
  const { pluginName, pluginAuthor, pluginAuthorMailAddress } = pluginData;
  const filesToCreate = fs.readdirSync(templatePath);
  const nameWords = pluginName.split('-');
  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    const stats = fs.statSync(origFilePath);
    const pluginNameMap = {
      yourDpluginDname: pluginName, //your-plugin-name
      yourPluginName: nameWords.join(''),
      YOUR_PLUGIN_NAME: nameWords.join('_').toUpperCase(),
      YourPluginName: nameWords.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(''),
      yourPluginVersion: version,
      pluginAuthor,
      pluginAuthorMailAddress,
    };
    const fileName = file.replace(
      /yourDpluginDname|yourPluginName|YourPluginName/g,
      name => pluginNameMap[name]
    );
    if (stats.isFile()) {
      console.log(chalk.cyan(`Creating ${fileName} file`));
      const contents = fs.readFileSync(origFilePath, 'utf8');
      let result = contents.replace(
        // eslint-disable-next-line max-len
        /yourDpluginDname|yourPluginName|YOUR_PLUGIN_NAME|YourPluginName|yourPluginVersion|pluginAuthorName|pluginAuthorMailAddress/g,
        name => pluginNameMap[name]
      );
      if (fileName === 'package.json') {
        result = result.replace(/"private": true,\n {2}/g, '');
      }
      const writePath = `${CURR_DIR}/${newProjectPath}/${fileName}`;
      fs.writeFileSync(writePath, result, 'utf8');
    } else if (stats.isDirectory()) {
      console.log(chalk.cyan(`Creating ${fileName} directory`));
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${fileName}`);

      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`, pluginData);
    }
  });
}

function addPluginToProject(projectPath, pluginName) {
  console.log(chalk.yellow(`Adding ${pluginName} to ${projectPath}`));
  const filePath = `${projectPath}/package.json`;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(chalk.red('Fail to read package.json', projectPath, err));
    } else {
      const packageJsonObj = JSON.parse(data);
      const newDependency = `wix-rich-content-plugin-${pluginName}`;
      packageJsonObj.dependencies = {
        ...packageJsonObj.dependencies,
        [newDependency]: version,
      };
      const packageJson = JSON.stringify(packageJsonObj, null, 2);
      fs.writeFile(filePath, packageJson, 'utf8', () => {
        console.log(chalk.bold.green(`${pluginName}-plugin added successfully 🎉🎊🎉🎊`));
        // exec(`npm i && npm run build && cd ${projectPath} && npm run start`);
      });
    }
  });
}

// function addPluginToExampleAppEditor(pluginName) {
//   const upperCasePluginName = pluginName.toUpperCase();
//   const pluginNameStartWithUpperCase = pluginName.charAt(0).toUpperCase() + pluginName.slice(1);

//   console.log(chalk.magenta(`Adding ${pluginName}-plugin to example app editor`));
//   const editorPluginsPath = `${exampleAppMainPath}/shared/editor/EditorPlugins.jsx`;
//   const importPluginBuffer = `import { create${pluginNameStartWithUpperCase}Plugin, ${upperCasePluginName}_TYPE } from 'wix-rich-content-plugin-${pluginName}';
//     import 'wix-rich-content-plugin-${pluginName}/dist/styles.min.css';`;
//   const createPluginsBuffer = `create${pluginNameStartWithUpperCase}Plugin,`;
//   const configBuffer = `[${upperCasePluginName}_TYPE]: {},`;

//   let data = fs.readFileSync(editorPluginsPath);
//   data = importPluginBuffer + '\n' + data;
//   const editorPluginsPos = data.indexOf('export const editorPlugins = [');
//   data =
//     data.substring(0, editorPluginsPos + 30) +
//     '\n' +
//     createPluginsBuffer +
//     '\n' +
//     data.substring(editorPluginsPos + 30);
//   const configPos = data.indexOf('const config = {');
//   data =
//     data.substring(0, configPos + 23) + '\n' + configBuffer + '\n' + data.substring(configPos + 23);
//   fs.writeFileSync(editorPluginsPath, data, 'utf8');
//   console.log(chalk.bold.green(`${pluginName}-plugin added successfully 🎉🎊🎉🎊`));
//   exec(`npm i && npm run build && cd ${exampleAppMainPath} && npm run start`);
// }
