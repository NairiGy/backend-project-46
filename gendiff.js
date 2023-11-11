#!/usr/bin/env node
import { Command } from 'commander';
import parse from './src/parsers.js';
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
    const data1 = parse(filepath1);
    const data2 = parse(filepath2);
    const diff = genDiff(data1, data2, options.format);
    console.log(diff);
  });

program.parse();
