const pr = require('./parseInput');
const fs = require('fs');
const { pipeline } = require('stream');
const mapCod = require('./mapCod');
const Caesar = require('./caesar');

pr.pars().then(
  program => {
    console.log('*************', program.opts());

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
      console.log('createWriteStream');
      streamOutput = fs.createWriteStream(program.output, { flags: 'a' });
    }

    pipeline(streamInput, caesarStream, streamOutput, err => {
      if (err) {
        console.error('Pipeline failed.', err);
      } else {
        console.log('Pipeline succeeded.');
      }
    });
  },
  error => console.error('error*****', error)
);
