const fs = require('fs');
const { join } = require('path');
const { runFile } = require('./lib/utils');

const compile = async (lang, input, code) => {
  const codeDir = join(process.cwd(), 'codes');
  const outputDir = join(process.cwd(), 'outputs');

  try {
    if (!fs.existsSync(codeDir)) {
      fs.mkdirSync(codeDir);
    }
  } catch (err) {
    throw new Error(err);
  }

  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
  } catch (err) {
    throw new Error(err);
  }

  const rn = await runFile('borat', code, lang, input);

  return rn;
};

module.exports = { compile };
