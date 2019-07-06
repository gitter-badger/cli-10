import Create from './commands/create';
import Add from './commands/add';

import yargs from 'yargs';

var argv = yargs
    .usage('Usage: $0 <command> [options]')
    .command(new Create)
    .command(new Add)
    .help('h')
    .alias('h', 'help')
    .epilog('MIT licensed')
    .argv;