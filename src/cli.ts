import Create from './create';

import yargs from 'yargs';

var argv = yargs
    .usage('Usage: $0 <command> [options]')
    .command(new Create)
    .help('h')
    .alias('h', 'help')
    .epilog('MIT licensed')
    .argv;