import { checkInputs, createProject } from './helper';

var argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('create', 'Create the Floyd project in the specified path')
    .example('$0 create -n example -p ~/projects', 'Create project \'example\' at ~/projects')
    .alias('n', 'name')
    .alias('p', 'path')
    .nargs({
        'n': 1,
        'p': 1,
    }) // not totally sure what it does
    .describe('name', 'Specify name of the project')
    .describe('path', 'Specify path of the project')
    .demandOption(['n', 'p'])
    .help('h')
    .alias('h', 'help')
    .epilog('MIT licensed')
    .argv;

checkInputs(argv.name, argv.path)
.then(createProject.bind(this))
.catch((err: Error) => {
    console.error(err.message);
});