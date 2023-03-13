import {min, max} from '@vee-validate/rules';

const PARAMS = [
  {
    name: 'length',
    cast: function (value) {
      return Number(value)
    }
  }
]

/**
 * min length check for string input.
 * the user input will be "corrected" (replacing line breaks), so that client and server side validation are identical
 *
 * @type {{params: [{cast: function(*=): number, name: string}], validate: (function(*=, *): boolean)}}
 */
export const string_min = {
  validate: (value, _a) => {
    return min(stringCorrection(value), {length: _a.length})
  },
  params: PARAMS
}

/**
 * max length check for string input.
 * the user input will be "corrected" (replacing line breaks), so that client and server side validation are identical
 *
 * @type {{params: [{cast: function(*=): number, name: string}], validate: (function(*=, *): boolean)}}
 */
export const string_max = {
  validate: (value, _a) => {
    return max(stringCorrection(value), {length: _a.length})
  },
  params: PARAMS
}


export const stringCorrection = (value) => {
  if (value == null) {
    return;
  }
  return value.replace(/\r?\n/g, '\r\n');
};
