const { Transform } = require('stream');

class Caesar extends Transform {
  constructor(_mapCod) {
    super();
    this.mapCod = _mapCod;
  }
  _transform(chunk, enc, done) {
    const out = chunk
      .toString()
      .split('')
      .map(item => {
        if (this.mapCod.get(item)) {
          return this.mapCod.get(item);
        }
        return item;
      });
    this.push(out.join(''));
    done();
  }
}

module.exports = Caesar;
