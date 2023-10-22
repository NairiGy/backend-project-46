import parse from './src/parse.js';
import genDiff from './src/genDiff.js';
import { Command } from 'commander';
const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    // .option('-h, --help', 'output usage information');
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2, options, command) => {
        const data1 = parse(filepath1);
        const data2 = parse(filepath2);
        const diff = genDiff(data1, data2);
        console.log(diff);
    });
program.command

program.parse();
