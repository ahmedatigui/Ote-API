const fs = require('fs');
const { join } = require('path');
const { runFile, deleteFile } = require('./lib/utils');

const compile = async (lang, input, code) => {

  const codeDir = join(process.cwd(), 'codes');
  const outputDir = join(process.cwd(), 'outputs');
  console.log("COM: ", codeDir);
  console.log("COM: ", outputDir);

  try {
    if (!fs.existsSync(codeDir)) {
      fs.mkdirSync(codeDir);
    }
  } catch (err) {
    console.error(err);
  }


  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
  } catch (err) {
    console.error(err);
  }



  const rn = await runFile('borat', code, lang, input);
  console.log("COM: ", rn);
  return rn;
}

// compile('py', '', 'print(\'Hello\')')

module.exports = { compile };
