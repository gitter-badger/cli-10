import fs from 'fs';
import path from 'path';
import os from 'os';
import { exec } from 'child_process';

import chalk from 'chalk';

import { Project } from './types';

export function checkInputs(name: string, path: string): Promise<Project> {
    return new Promise((resolve, reject) => {
        if (name === '' || path === '') {
            reject(new Error("arguments cannot be empty"));
        }
        resolve(<Project>{ name, path });
    });
}

export async function createProject(projectObject: Project) {
    // replace '~' with /home/<username>
    if (projectObject.path[0] == '~') {
    	projectObject.path = path.join(<string>process.env.HOME, projectObject.path.slice(1));
    }

    let absolutePath = path.resolve(projectObject.path);
    absolutePath = path.join(absolutePath, projectObject.name);

    await fs.mkdir(absolutePath, (err) => {
    	// no error encountered
    	if (err) {
    		console.error(chalk.red(err.message));
    	}
    });

    let command = `git clone https://github.com/faraazahmad/floyd.git ${absolutePath}`;
    exec(command);
}