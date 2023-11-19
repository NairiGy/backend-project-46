#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from './src/genDiff.js';

const program = new Command();

program
  .description('Compares two econfiguration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  // .option('-h, --help', 'output usage information');
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    const diff = genDiff(filepath1, filepath2, options.format);
    console.log(diff);
  });

program.parse();
