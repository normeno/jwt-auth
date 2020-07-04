import chalk from 'chalk';

const error = (msg: string) => {
  console.error(chalk.bold.red(msg));
};

const warning = (msg: string) => {
  console.warn(chalk.keyword('orange')(msg));
};

const success = (msg: string) => {
  console.info(chalk.green(msg));
};

const info = (msg: string) => {
  console.info(chalk.magenta(msg));
};

const debug = (msg: string) => {
  console.debug(chalk.italic.white(msg));
};

const logger = {
  error,
  warning,
  success,
  info,
  debug,
};

export default logger;
