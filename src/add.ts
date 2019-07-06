/*
    CLI command to add new component to floyd project folder
*/

import { CommandModule, Arguments, CommandBuilder, Argv } from 'yargs';
import { writeFile } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

export default class Add implements CommandModule {
    public command: string;
    public describe: string;
    public builder: CommandBuilder;
    public handler: (args: Arguments) => void;

    constructor() {
        this.command = "add <name>";
        this.describe = "Add new component to project";

        this.builder = (yargs: Argv) => {
            return yargs
                .positional('name', {
                    describe: 'name of your component',
                    type: 'string',
                });
        }

        this.handler = async (args: Arguments) => {
            // TODO: check if pwd is a Floyd app

            // add component name to app.config.json
            let componentName = args.name as string;
            let fileName = join(__dirname, 'app.config.json');
            
            let config = require(fileName);
            config.components.push(componentName);

            writeFile(fileName, JSON.stringify(config, null, 2), (err) => {
                if (err) {
                    chalk.red(err.message);
                    process.exit(1);
                }
            });

            // finally inform user
            console.log(chalk.green(`Successfully created component ${componentName}.`));
        }
    }
};