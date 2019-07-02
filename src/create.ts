import { join, resolve } from 'path';
import { exec } from 'child_process';
import { existsSync } from 'fs';


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
            /* 
                check if ~/.floyd/ exists
                !! Callback version used since fs.promises.access is still experimental as of July 2nd, 2019 !!
            */
            let floydExists = existsSync(join(`${process.env.HOME}`, '.floyd'));
            let appExists: boolean;

            if (floydExists) {
                appExists = existsSync(join(`${process.env.HOME}`, '.floyd', 'app'));
            } else {

            }
            // if not, create ~/.floyd and clone app into it








            let name: string = args.name as string;
            let path: string = args.path as string;

            
        };
    }
    
    private clone(name: string, path: string) {
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
    }

    private copyToPath(path: string) {

    }
};