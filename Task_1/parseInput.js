const { program } = require('commander');
module.exports.pars = () => {
  program
    .option('-s, --shift <type>', 'a shift')
    .option('-i, --input <type>', 'an input file')
    .option('-o, --output <type>', 'an output file')
    .option('-a, --action <action>', 'an action encode/decode');
  program.parse(process.argv);
  if (program.action !== 'encode' && program.action !== 'decode') {
    console.error('only -a --action = encode or decode');
    throw new Error('action bad!');
  }
  console.log(typeof parseInt(program.shift, 10), parseInt(program.shift, 10));
  if (isNaN(parseInt(program.shift, 10))) {
    console.error('only -s --shift not number');
    throw new Error('shift bad!');
  }
  /* fs.stat(program.input, (err, stat) => {
    if (err) {
      console.error(err);
      return null;
    }
    console.log(stat.mode);
    return stat;
  });

  fs.stat(program.output, (err, stat) => {
    if (err) {
      console.error(err);
      return null;
    }
    console.log(stat.mode);
    return stat;
  });*/

  return program;
};
