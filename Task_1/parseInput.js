const { program } = require('commander');
const fs = require('fs');
const path = require('path');
module.exports.pars = async () => {
  let messageError = 'not';
  return await new Promise((resolve, reject) => {
    program
      .option('-s, --shift <type>', 'a shift')
      .option('-i, --input <type>', 'an input file')
      .option('-o, --output <type>', 'an output file')
      .option('-a, --action <action>', 'an action encode/decode');

    program.parse(process.argv);
    if (program.action !== 'encode' && program.action !== 'decode') {
      console.error('only -a --action = encode or decode');
      messageError = 'action bad!';
    }
    console.log(
      typeof parseInt(program.shift, 10),
      parseInt(program.shift, 10)
    );
    if (isNaN(parseInt(program.shift, 10))) {
      console.error('only -s --shift not number');
      messageError = 'shift bad!';
    }

    if (program.output !== undefined) {
      program.output = path.resolve(__dirname, program.output);
      fs.stat(program.output, (err, stat) => {
        if (err) {
          console.error(err);
          messageError = `${program.output} file out errors `;
          if (messageError !== 'not') {
            reject(messageError);
          }
        } else {
          console.log(stat);
          if (messageError !== 'not') {
            reject(messageError);
          } else {
            resolve(program);
          }
        }
      });
    } else if (messageError !== 'not') {
      reject(messageError);
    } else {
      resolve(program);
    }

    if (program.input !== undefined) {
      program.input = path.resolve(__dirname, program.input);
    }

    console.log('messageError = ', messageError);
    console.log('program = ', program.opts());
  });
};
