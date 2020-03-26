const { program } = require('commander');

const fs = require('fs');

program
  .option('-s, --shift <type>', 'a shift')
  .option('-i, --input <type>', 'an input file')
  .option('-o, --output <type>', 'an output file')
  .option('-a, --action <type>', 'an action encode/decode');

program.parse(process.argv);
console.log(program.opts());

if (program.action === undefined) {
  throw new Error('action bad!');
}

if (program.shift === undefined) {
  throw new Error('shift bad!');
}
const mapCod = require('./mapCod');
const Caesar = require('./caesar');
let streamInput;
let streamOutput;

const caesarStream = new Caesar(
  mapCod.mapCod(program.shift, program.action),
  program.action,
  +program.shift
);

if (program.input === undefined) {
  process.stdin.setEncoding('utf8');
  streamInput = process.stdin;
} else {
  streamInput = fs.createReadStream(program.input, 'utf-8');
}

if (program.output === undefined) {
  streamOutput = process.stdout;
} else {
  streamOutput = fs.createWriteStream(program.output, 'utf-8');
}

// streamInput.pipe(caesarStream).pipe(streamOutput);

const { pipeline } = require('stream');
pipeline(streamInput, caesarStream, streamOutput, err => {
  if (err) {
    console.error('Pipeline failed.', err);
  } else {
    console.log('Pipeline succeeded.');
  }
});
