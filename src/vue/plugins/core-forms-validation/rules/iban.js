const ibantools = require('ibantools');

export const iban = {
  validate: (value) => {
    return ibantools.isValidIBAN(value.replace(/\s/g, ''));
  },
};
