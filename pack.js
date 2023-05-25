const { zip } = require('zip-a-folder');
const path = require('path');
const fs = require('fs-extra');
const packageJson = require('./package.json');

if (require.main === module) {
  main();
}

async function main() {
  const { name, version } = packageJson;
  const fileName = `${name}-${version}`;
  const packDir = path.join(__dirname, 'pack');
  const fileDir = path.join(__dirname, `pack/${fileName}`);
  const packDistDir = path.join(__dirname, `pack/${fileName}/dist`);
  const distDir = path.join(__dirname, 'dist');

  if (!fs.existsSync(distDir)) {
    throw new Error('/dist not exists, must build before pack');
  }

  fs.emptyDirSync(packDir);
  fs.emptyDirSync(fileDir);
  fs.emptyDirSync(packDistDir);
  fs.copySync(distDir, packDistDir);

  const inPath = packDir;
  const outPath = path.join(__dirname, `${name}-${version}.zip`);
  await zip(inPath, outPath);

  fs.removeSync(packDir);
  console.log(`Pack '${outPath}' complete`);
}
