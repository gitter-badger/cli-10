import { join, resolve } from 'path';
import { exec } from 'child_process';

import chalk from 'chalk';
import { CommandModule, Arguments, CommandBuilder, Argv } from 'yargs';

export default class Create implements CommandModule {
    public command: string;
    public describe: string;
    public builder: CommandBuilder;
    public handler: (args: Arguments) => void;

    constructor() {
        this.command = "create <name> <path> [options]";
        this.describe = "Create a Floyd project";

        this.builder = (yargs: Argv) => {
            return yargs
            .positional('name', {
                describe: 'name of your project',
                type: 'string',
            })
            .positional('path', {
                describe: 'path of the directory to create your project in',
                type: 'string',
            })
            .option('force-clone', {
                alias: 'f',
                describe: 'Forcefully download app code from source',
                type: 'boolean',
            });
        }

        this.handler = async (args: Arguments) => {
            let name: string = args.name as string;
            let path: string = args.path as string;

            // replace '~' with /home/<username>
            if (path[0] == '~') {
                path = join(<string>process.env.HOME, path.slice(1));
            }

            // get the absolute path and add project path to it
            let absolutePath = resolve(path);
            absolutePath = join(absolutePath, name);

            let command = `git clone https://github.com/floyd-framework/app.git ${absolutePath}`;
            exec(command, (err) => {
                // error encountered while executing command
                if (err) {
                    console.error(chalk.red(err.message));
                }
            });
        };
    }   
};