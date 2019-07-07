/*
    CLI command to create a new floyd project folder
*/

import { join, resolve } from 'path';
import { exec } from 'child_process';
import { rmdir, readdirSync } from 'fs';

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
                describe: 'Forcefully clone latest app code from source',
                type: 'boolean',
            });
        }

        this.handler = async (args: Arguments) => {
            let name = args.name as string;
            let path = args.path as string;
            let forceClone = args.forceClone as boolean;

            if (forceClone) {
                await this.clone();
            } else {
                let appDir = join(`${process.env.HOME}`, '.floyd', 'app');

                // clone app from github if last clone was done 15+ days ago
                let lastCloneDate = readdirSync(appDir)[0];
                let timeAgoString = moment(lastCloneDate, "DD_MM_YYYY").fromNow();
                let timeAgoArray = timeAgoString.split(" ");

                if (timeAgoArray[0] > "15" && timeAgoArray[1] == "days") {
                    await this.clone();
                    
                    // delete old version of cloned app repository
                    rmdir(join(appDir, lastCloneDate), (err) => {
                        if (err) {
                            console.error(chalk.red(err.message));
                            process.exit(1);
                        }
                    });
                    // TODO: remove .git folder from created app directory
                }
            }

            this.copyToPath(name, path);
            chalk.green(`Project ${name} successfully created.`);
        };
    }
    
    private clone() {
        let date = moment().format('DD_MM_YYYY');
        let absolutePath = join(`${process.env.HOME}`, '.floyd', 'app', date);

        let command = `git clone https://github.com/floyd-framework/app.git ${absolutePath}`;
        chalk.gray('Updating local app repository...');
        exec(command, (err) => {
            // error encountered while executing command
            if (err) {
                console.error(chalk.red(err.message));
                process.exit(1);
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