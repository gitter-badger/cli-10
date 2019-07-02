import { join, resolve } from 'path';
import { exec } from 'child_process';
import { existsSync, mkdir } from 'fs';

import chalk from 'chalk';
import moment from 'moment';
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
            let name = args.name as string;
            let path = args.path as string;

            // check if ~/.floyd/app exists
            let appExists = existsSync(join(`${process.env.HOME}`, '.floyd', 'app'));
            
            if (appExists) {
                this.copyToPath(name, path);
            } else {
                // if not, create ~/.floyd/app and clone app into it
                await mkdir(join(`${process.env.HOME}`, '.floyd'),'', (err) => {
                    if (err) {
                        console.error(chalk.red(err.message));
                        process.exit(1);
                    }
                });
                await this.clone();
                this.copyToPath(name, path);
            }










            
        };
    }
    
    private clone() {
        let date = moment().format('DDMMYYYY');
        let absolutePath = join(`${process.env.HOME}`, '.floyd', 'app', date);

        let command = `git clone https://github.com/floyd-framework/app.git ${absolutePath}`;
        exec(command, (err) => {
            // error encountered while executing command
            if (err) {
                console.error(chalk.red(err.message));
            }
        });
    }

    private copyToPath(name: string, path: string) {
        // replace '~' with /home/<username>
        if (path[0] == '~') {
            path = join(<string>process.env.HOME, path.slice(1));
        }

        // get the absolute path and add project path to it
        let absolutePath = resolve(path);
        absolutePath = join(absolutePath, name);
    }
};