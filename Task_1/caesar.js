const { Transform } = require('stream');
const cod = require('./coddingCeasar');
class Caesar extends Transform {
  constructor(_mapCod, action, _shift) {
    super();
    this.mapCod = _mapCod;
    if (action !== 'encode') {
      this.shift = -_shift;
    } else {
      this.shift = _shift;
    }
  }
  _transform(chunk, enc, done) {
    const out = chunk
      .toString()
      .split('')
      .map(item => {
        /*         if (this.mapCod.get(item)) {
          return this.mapCod.get(item);
        } */
        return cod.code(item, this.shift);
      });
    this.push(out.join(''));
    done();
  }
}
module.exports = Caesar;
