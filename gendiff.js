const { Command } = require('commander');
const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    // .option('-h, --help', 'output usage information');
    .helpOption('-h, --help', 'output usage information');
program.command

program.parse();
