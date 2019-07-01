import { mkdir } from 'fs';
import { join, resolve } from 'path';
import { exec } from 'child_process';

import chalk from 'chalk';
import { CommandModule, CommandBuilder, Arguments } from 'yargs';

export default class Create implements CommandModule {
    public command: string;
    public describe: string;
    public builder: CommandBuilder;
    public handler: (args: Arguments) => void;

    constructor() {
        this.command = "create <name> <path>";
        this.describe = "Create a Floyd project";
        this.builder = {
            name: {
                alias: 'n',
                type: 'string',
                description: 'name of your project',
            },
            path: {
                alias: 'p',
                type: 'string',
                description: 'path of directory to create your project folder',
            },
        };

        this.handler = async (args: Arguments) => {
            let name: string = args.name as string;
            let path: string = args.path as string;

            // replace '~' with /home/<username>
            if (path[0] == '~') {
                path = join(<string>process.env.HOME, path.slice(1));
            }

            let absolutePath = resolve(path);
            absolutePath = join(absolutePath, name);

            await mkdir(absolutePath, (err) => {
                // no error encountered
                if (err) {
                    console.error(chalk.red(err.message));
                }
            });

            let command = `git clone https://github.com/faraazahmad/floyd.git ${absolutePath}`;
            exec(command);
        };
    }   
};