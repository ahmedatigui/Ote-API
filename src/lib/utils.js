// const fs = require('fs');
// const { join } = require('path');
// const { spawnSync, execSync } = require('child_process');
// const { v4: uuidv4 } = require('uuid');

// const { commandMap } = require('./commands');

import fs from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { v4 as uuidv4 } from 'uuid';

import { commandMap } from './commands.js';


// Create a file
export const createFile = async (file, content, extension) => {
  const filepath = join(process.cwd(), 'codes');
  const filename_id = uuidv4();
  const filename = `${file}${filename_id}`;
  const filewithext = `${file}${filename_id}.${extension}`;
  const filelocation = join(filepath, filewithext);

  try {
    fs.writeFileSync(filelocation, content);
  } catch (err) {
    throw new Error(err);
  }

  return {
    filelocation,
    filepath,
    filewithext,
    filename,
    filename_id,
    extension,
  };
};

// Execute a file
export const execFile = async (filename, lang, input) => {
  const {
    compileCodeCommand,
    compilationArgs,
    executeCodeCommand,
    executionArgs,
    outputExt,
    compilerInfoCommand,
  } = commandMap(filename, lang);

  if (compileCodeCommand) {
    const { output, stdout, stderr, status, error } = spawnSync(
      compileCodeCommand,
      compilationArgs || [],
      { timeout: 1000 * 16, encoding: 'utf-8' }
    );
  }

  const { output, stdout, stderr, status, error } = spawnSync(
    executeCodeCommand,
    executionArgs || [],
    { input: input, timeout: 1000 * 16, encoding: 'utf-8' }
  );

  return { stdout, stderr: stderr.split(',')[1], status };
};

// Run a file
export const runFile = async (file, content, lang, input) => {
  const fileres = await createFile(file, content, lang);

  const result = await execFile(fileres.filename, lang, input);

  await deleteFile(fileres.filename, lang, result.outputExt);

  return result;
};

// Delete a file
export const deleteFile = async (filename, lang, extension = undefined) => {
  const codeFile = join(process.cwd(), `codes/${filename}.${lang}`);
  const outputFile = extension
    ? join(process.cwd(), `outputs/${filename}.${extension}`)
    : undefined;

  try {
    fs.unlinkSync(codeFile);
    outputFile && fs.unlinkSync(outputFile);
  } catch (err) {
    throw new Error(err);
  }
};

// module.exports = { createFile, execFile, runFile, deleteFile };
