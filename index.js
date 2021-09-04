const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const Tasknote = require('./core/tasknote');
const Conector = require('./core/conector');

const utils = require("./core/utils");

const info = {
  version: 1.0,
  description: "CLI para anotar to-do (cosas por hacer)."
}

const join = (...args) => {
  return path.join(__dirname, ...args);
}

const database = new Conector(join("core", "tasknote.sqlite"));

program.version(info.version, "-v, --version", "Muestra la versión del programa.");

program.helpOption("-h, --help", "Muestra el mensaje de ayuda.");

program.usage("[opciones]");

program.addHelpText("before", `Tasknote v${info.version} - ${info.description}\n`);

program.addHelpText("after", "\nCopyright 2021 Anventec");

const fileFilter = (file) => file.endsWith(".js");

const optionsFiles = fs.readdirSync(join("options")).filter(fileFilter);

for (let option of optionsFiles) {
  option = require(join("options", option));

  const args = [
    option.flags.join(", ")
  ];

  if (option.arguments) args[0] = [args[0], option.arguments].join(" ");

  if (option.description) args.push(option.description);

  if (option.default) args.push(option.default);

  program.option(...args);
}

program.parse();

const options = program.opts();

new Tasknote(options, database);