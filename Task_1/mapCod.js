exports.mapCod = function mapCod(shift = 7, action = 'encode') {
  const eng = require('./data');
  let actionEnDe = -1;
  if (action === 'encode') {
    actionEnDe = 1;
  } else {
    actionEnDe = -1;
  }
  const mapEn = new Map();
  for (let index = 0; index < eng.en.length; index++) {
    const key = eng.en[index];
    let indexShift = index + actionEnDe * parseInt(shift, 10);
    if (indexShift > eng.en.length - 1) {
      indexShift = indexShift - eng.en.length;
    }
    const value = eng.en[indexShift];
    mapEn.set(key, value);
  }

  for (let index = 0; index < eng.EN.length; index++) {
    const key = eng.EN[index];
    let indexShift = index + actionEnDe * parseInt(shift, 10);
    if (indexShift > eng.EN.length - 1) {
      indexShift = indexShift - eng.EN.length;
    }
    const value = eng.EN[indexShift];
    mapEn.set(key, value);
  }
  return mapEn;
};
