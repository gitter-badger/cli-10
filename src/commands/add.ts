/*
    CLI command to add new component to floyd project folder.
    Steps that will take place:
    1. Add component name to app/app.config.json
    2. copy component folder to app and rename it to component name
*/

import { CommandModule, Arguments, CommandBuilder, Argv } from 'yargs';
import { writeFile } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

import { isFloydProject } from '../helpers';
import { exec } from 'child_process';

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

        this.handler = (args: Arguments) => {
            // check if pwd is a Floyd app
            if (!isFloydProject) {
                chalk.red('Current folder is not a Floyd project');
                process.exit(1);
            }

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

            // create the component
            this.createComponent(componentName);

            // finally inform user
            console.log(chalk.green(`Successfully created component ${componentName}.`));
        }
    }

    private async createComponent(componentName: string) {
        // copy component folder to app/components/
        const copyCommand = `cp -r ${join(__filename, '..', '..', 'component')} .`;
        await exec(copyCommand, (err) => {
            if (err) {
                chalk.red(err.message);
                process.exit(1);
            }
        });

        // rename folder to component name
        const basePath = join('.', 'app', 'components');
        const renameCommand = `mv ${join(basePath, 'component')} ${join(basePath, componentName)}`;
        exec(renameCommand, (err) => {
            if (err) {
                chalk.red(err.message);
                process.exit(1);
            }
        });
    }
};