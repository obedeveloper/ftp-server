import { listFilesAndDir } from './utils.ts';

const path = prompt('Enter the path: \n> ');
console.log(await listFilesAndDir(path));
