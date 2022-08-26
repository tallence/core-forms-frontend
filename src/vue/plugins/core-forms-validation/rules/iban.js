import IBAN from "iban"

export const iban = {
  validate: (value) => {
    return IBAN.isValid(value);
  },
};
