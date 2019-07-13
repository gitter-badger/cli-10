/*
    CLI command to add new component to floyd project folder.
    Steps that will take place:
    1. Add component name to app/app.config.json
    2. copy component folder to app and rename it to component name
*/

import { CommandModule, Arguments, CommandBuilder, Argv } from 'yargs';
import { writeFile, mkdirSync } from 'fs';
import { join, resolve } from 'path';
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

        this.handler = async (args: Arguments) => {
            // check if pwd is a Floyd app
            if (!isFloydProject) {
                console.log(chalk.red('Current folder is not a Floyd project'));
                process.exit(1);
            }

            let componentName = args.name as string;
            let fileName = resolve(join('.', 'app', 'app.config.json'));

            // add component name to app.config.json
            let config = require(fileName);
            // exit with error if component of same name exists
            if (config.components[componentName]) {
                console.error(chalk.red(`Component named ${componentName} already exists`));
                process.exit(1);
            }
            // if no such component exists, add to app.config.json
            config.components[componentName] = componentName;

            // append to schema.graphql
            this.appendToSchema(componentName);
            
            writeFile(fileName, JSON.stringify(config, null, 2), (err) => {
                if (err) {
                    console.log(chalk.red(err.message));
                    process.exit(1);
                }
            });
            
            // create the component
            await this.createComponent(componentName);

            // finally inform user
            console.log(chalk.green(`Successfully created component ${componentName}.`));
        }
    }

    private async createComponent(componentName: string) {
        // copy component folder to app/components/
        let sourcePath = join(__filename, '..', '..', 'dist', 'component', '*');
        let destinationPath = resolve(join('.', 'app', 'components', 'cat'));

        // create destination path
        mkdirSync(destinationPath, {
            recursive: true,
        });

        // copy files to path
        const copyCommand = `cp -r ${sourcePath} ${destinationPath}`;
        await exec(copyCommand, (err) => {
            if (err) {
                console.log(chalk.red(err.message));
                process.exit(1);
            }
        });
    }

    private async appendToSchema(component: string) {
        let schemaFileName = resolve(join('.', 'app', 'schema.graphql'));
        let importString = `import * from ./components/${component}/schema.graphql`;

        let appendCommand = `sed -i "1s;^;${importString}\n;" ${schemaFileName}`;
        exec(appendCommand, (err) => {
            if (err) {
                console.error(chalk.red(err.message));
                process.exit(1);
            }
        });
    }
};