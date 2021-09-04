const chalk = require('chalk');
const emojis = require('./emojis');
const utils = require('./utils');
const moment = require('moment');

module.exports = class Tasknote {
  constructor(options, database) {
    this.options = options;
    
    this.database = database;

    this.given = Object.keys(this.options);

    for (const option of this.given) {
      this[option](this.options[option]);
    }

    if (this.given.length < 1) this.main(this.options);  
  }

  async main() {
    console.log(emojis.loading, chalk.cyan("Obteniendo tareas desde la base de datos..."));

    const tasks = await this.database.all("SELECT * FROM tasks;");

    if (tasks.length < 1) return console.log(emojis.error, chalk.red("No hay tareas en la base de datos."));

    const unCheckedTasks = tasks.filter(task => task.checked == 0);
    
    const checkedTasks = tasks.filter(task => task.checked == 1);

    console.log(emojis.list, chalk.green("Mostrando tareas:"), chalk.magenta(`(${tasks.length} tareas, ${checkedTasks.length} de ${tasks.length} completadas)`));

    console.log(chalk.cyan("\tTareas no completadas:"), chalk.magenta(`(${unCheckedTasks.length})`));

    for (const task of unCheckedTasks) {
      console.log(`\t\t${emojis.unchecked} ${chalk.yellow(task.id)} * ${chalk.gray(task.content)} ${chalk.cyan(`(${moment(task.date).format("DD/MM/YYYY, h:mm:ss A")})`)}`);
    }

    console.log(chalk.cyan("\tTareas completadas:"), chalk.magenta(`(${checkedTasks.length})`));

    for (const task of checkedTasks) {
      console.log(`\t\t${emojis.checked} ${chalk.yellow(task.id)} * ${chalk.gray(task.content)} ${chalk.cyan(`(${moment(task.date).format("MM/DD/YYYY, h:mm:ss A")})`)}`);
    }
  }

  async task(content) {
    console.log(emojis.loading, chalk.cyan("Creando tarea:"), chalk.gray(content.join(" ")));

    const ID = utils.generateID(4);

    await this.database.run(`INSERT INTO tasks(id, content, checked, date) VALUES("${ID}", "${content.join(" ")}", 0, "${new Date().toUTCString()}");`);

    console.log(emojis.success, chalk.green("Tarea creada, ID:"), chalk.yellow(ID));
  }

  async check(content) {
    if (!await this.database.has(`SELECT * FROM tasks WHERE id = "${content}";`)) return console.log(emojis.error, chalk.red("No existe una tarea con esa ID."));
  
    const task = await this.database.get(`SELECT * FROM tasks WHERE id = "${content}";`);

    const newStatus = (task.checked == 0) ? {
      message: "completada",
      color: "yellow",
      integer: 1
    } : {
      message: "no completada",
      color: "red",
      integer: 0
    };

    await this.database.run(`UPDATE tasks SET checked = ${newStatus.integer} WHERE id = "${content}";`);

    console.log(emojis.success, chalk.green("La tarea", chalk.yellow(task.id), "fue marcada como"), chalk[newStatus.color](newStatus.message) + ".");
  }

  async delete(content) {
    if (!await this.database.has(`SELECT * FROM tasks WHERE id = "${content}";`)) return console.log(emojis.error, chalk.red("No existe una tarea con esa ID."));

    await this.database.run(`DELETE FROM tasks WHERE id = "${content}";`);

    console.log(emojis.success, chalk.green("La tarea", chalk.yellow(content), "fue eliminada."));
  }

  setup() {
    const queries = [
      "CREATE TABLE IF NOT EXISTS tasks(id TEXT, content TEXT, checked INTEGER, date TEXT);"
    ];

    queries.forEach(async (query) => {
      this.database.run(query);
    });

    console.log(emojis.success, chalk.green("Base de datos configurada exitosamente."));
  }
}