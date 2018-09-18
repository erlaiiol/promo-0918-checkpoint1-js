const prompt = require('prompt');
const colors = require("colors/safe");

const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const readFileSync = promisify(readFile);
const writeFileSync = promisify(writeFile);

const asyncPrompt = require('./lib/async-prompt').asyncPrompt;

const filename = 'answers.txt';

async function startQcm() {
  // Clear default message from prompt
  prompt.message = '';

  // Start the prompt
  prompt.start();

  // Initialize answers
  let answers = '';

  // Read JSON containing the questions
  const fileJson = await readFileSync('./data/qcm.json');
  // Parse the JSON file
  const questions = JSON.parse(fileJson.toString());
  const nbQuestions = questions.length;

  console.log(colors.yellow.underline('\n ---- Quiz JS ---- \n'));
  console.log(colors.yellow.bold('Répondez au questions suivantes.'));
  console.log(colors.yellow.bold('Si plusieurs réponses sont possibles, séparez vos réponses par ","'));
  console.log(colors.yellow.bold('À la fin du quiz, un fichier "answers.txt" sera automatiquement généré.'));
  console.log(colors.yellow.bold('N\'oubliez pas de commiter ce fichier ;) '));
  console.log(colors.red.bold('Si vous avez déjà répondu au quiz, le fichier précédemment créé sera automatiquement supprimé.'));

  console.log(colors.green.bold('\n ---- C\'est parti !!! ---- \n'));

  // Loop for each questions
  for (let i = 0; i < nbQuestions; i++) {
    console.log(colors.red.bold(`\n Question ${i + 1} :`));
    const question = questions[i];
    for (const key in question) {
      if (key === "q") {
        console.log(colors.blue.bold(` ${question[key]}`));
      } else {
        console.log(colors.blue(`    ${key}: ${question[key]}`));
      }
    }
    console.log('');
    const answer = await asyncPrompt(['Réponse']);
    answers += (`Q.${i + 1}: ${answer['Réponse']}\n`);
    console.log(colors.green.bold('\n  ---------------------------------'));
  }

  try {
    // Try to remove previous answers
    await exec(`rm ${filename}`);
  } catch (e) { }
  finally {
    try {
      // Write answers
      await writeFileSync(`./${filename}`, answers);
      console.log(colors.green.italic('Vos réponses ont bien été enregistrées.'));
      console.log(colors.green.italic('Merci d\'avoir participé à ce quiz!'));
    } catch (e) {
      console.log(colors.red.italic('Error : ', e));
      console.log(colors.red.italic('Abort creating file.'));
      console.log('');
    }
  }

  // Stop prompt
  prompt.stop();
};

module.exports = {
  startQcm,
};
