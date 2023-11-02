#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }

  return true;
}

const projectName = process.argv[2];
const CURR_DIR = process.cwd();

console.log(`Creating your project '${projectName}'`);

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8');

      if (file === 'index.html') {
        contents = contents.replace(
          'DOM Manipulation Library Template',
          projectName,
        );
      }

      if (file === 'package.json') {
        contents = contents.replace('name-of-your-project', projectName);
      }

      // Rename
      if (file === '.npmignore') file = '.gitignore';

      const writePath = `${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`,
      );
    }
  });
}

try {
  fs.mkdirSync(`${CURR_DIR}/${projectName}`);
} catch (error) {
  // console.log(error);
  console.log(`A directory with the name '${projectName}' already exists.`);
  process.exit();
}

createDirectoryContents(
  `${__dirname}/../template`,
  `${CURR_DIR}/${projectName}`,
);

console.log('Installing dependencies...');

const installedDeps = runCommand(`cd ${projectName} && npm install`);

if (!installedDeps) process.exit();

console.log(`
  Congratulations! Your project template has been created.

  run 'cd ${projectName}' to get inside your project
  run 'npm run build' to build your project
  run 'npm run start' to open your project on port 8080

  Happy Coding!
`);
