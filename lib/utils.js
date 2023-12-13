const fs = require('fs');
const { join } = require('path');
const { spawnSync, execSync } = require('child_process')
const { v4: uuidv4 } = require('uuid');


const { commandMap } = require('./commands');

// Create a file
const createFile = async (file, content, extension) => {
  const filepath = join(process.cwd(), 'codes');
  const filename_id = uuidv4();
  const filename = `${file}${filename_id}`;
  const filewithext = `${file}${filename_id}.${extension}`;
  const filelocation = join(filepath, filewithext);
  console.log("FILOC: ", filelocation);

  try {
    fs.writeFileSync(filelocation, content);

    console.log("File written successfully\n");
    console.log("The written has the following contents:");
    console.log(fs.readFileSync(filelocation, "utf8"));

   } catch(err) {
      console.log("ERROR: ", err);
      console.log("FP: ", filepath);
      throw new Error(err);
   }

  return {filelocation, filepath, filewithext, filename, filename_id, extension};
};


// Execute a file
const execFile = async (filename, lang, input) => {


  const { compileCodeCommand, compilationArgs, executeCodeCommand, executionArgs, outputExt, compilerInfoCommand } = commandMap(filename, lang);

  if(compileCodeCommand){
    const { output, stdout, stderr, status, error } = spawnSync(compileCodeCommand, compilationArgs || [], { timeout: 1000 * 16, encoding: 'utf-8' });
    console.log("EXECOM: ", { output, stdout, stderr, status, error });
  }

  const { output, stdout, stderr, status, error } = spawnSync(executeCodeCommand, executionArgs || [], { input: input, timeout: 1000 * 16, encoding: 'utf-8' });
  console.log("EXEEXE: ", { output, stdout, stderr, status, error });

  return { stdout, stderr: stderr.split(",")[1], status };
};

// Run a file
const runFile = async (file, content, lang, input) => {
  
    const fileres =  await createFile(file, content, lang);

    const result = await execFile(fileres.filename, lang, input);

    await deleteFile(fileres.filename, lang, result.outputExt);

    return result;

};

// Delete a file
const deleteFile = async (filename, lang, extension = undefined) => {
  const codeFile = join(process.cwd(), `codes/${filename}.${lang}`);
  const outputFile = extension ? join(process.cwd(), `outputs/${filename}.${extension}`):undefined;

  try{
    fs.unlinkSync(codeFile);
    outputFile && fs.unlinkSync(outputFile);
    console.log('deleted successfully!')
  }catch(err){
    throw new Error(err);
  }
};

module.exports = {createFile, execFile, runFile, deleteFile};
