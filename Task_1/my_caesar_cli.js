const { program } = require('commander');

const fs = require('fs');

program
  .option('-s, --shift <type>', 'a shift')
  .option('-i, --input <type>', 'an input file')
  .option('-o, --output <type>', 'an output file')
  .option('-a, --action <type>', 'an action encode/decode');

program.parse(process.argv);

if (program.action === undefined) {
  throw new Error('action bad!');
}

if (program.shift === undefined) {
  throw new Error('shift bad!');
}

let readStream;

const mapCod = require('./mapCod');
const Caesar = require('./caesar');

const caesarStream = new Caesar(mapCod.mapCod(program.shift, program.action));

if (program.input === undefined) {
  process.stdin.setEncoding('utf8');
  process.stdin.pipe(caesarStream).pipe(process.stdout);
} else {
  readStream = fs.createReadStream(program.input, 'utf-8');
  readStream.pipe(caesarStream).pipe(process.stdout);
}
