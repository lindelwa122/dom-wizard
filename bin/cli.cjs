#!/usr/bin/env node

const fs = require("fs")

const projectName = process.argv[2];
const CURR_DIR = process.cwd();

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf8");

      // Rename
      if (file === ".npmignore") file = ".gitignore";

      const writePath = `${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
}

try {
  fs.mkdirSync(`${CURR_DIR}/${projectName}`);
} catch(error) {
  // console.log(error);
  console.log(`A directory with the name '${projectName}' already exists.`);
  process.exit();
}

createDirectoryContents(`${__dirname}/../template`, `${CURR_DIR}/${projectName}`);

console.log(`
  Your project template has been created!
`)
