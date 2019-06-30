import fs from 'fs';
import path from 'path';

import { Project } from './types';

export function checkInputs(name: string, path: string): Promise<Project> {
    return new Promise((resolve, reject) => {
        if (name === '' || path === '') {
            reject(new Error("arguments cannot be empty"));
        }
        resolve(<Project>{ name, path });
    });       
}

export function createProject(projectObject: Project) {
    console.log(path.resolve(projectObject.path));
}