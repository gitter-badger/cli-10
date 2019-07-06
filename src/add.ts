/*
    CLI command to add new component to floyd project folder
*/

import { join, resolve } from 'path';
import { exec } from 'child_process';
import { rmdir, readdirSync } from 'fs';

import chalk from 'chalk';
import moment from 'moment';
import { CommandModule, Arguments, CommandBuilder, Argv } from 'yargs';

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
                    describe: 'name of your project',
                    type: 'string',
                });
        }

        this.handler = async (args: Arguments) => {
            // TODO: check if pwd is a Floyd app


            // component name
            let name = args.name as string;

            // add name to app.config.js
        }
    }
};