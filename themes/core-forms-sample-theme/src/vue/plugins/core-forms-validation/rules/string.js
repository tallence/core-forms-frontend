import {max, min} from "vee-validate/dist/rules";
import {stringCorrection} from "../utils";

const PARAMS = [
    {
        name: 'length',
        cast: function (value) {
            return Number(value);
        }
    }
];

/**
 * min length check for string input.
 * the user input will be "corrected" (replacing line breaks), so that client and server side validation are identical
 *
 * @type {{params: [{cast: function(*=): number, name: string}], validate: (function(*=, *): boolean)}}
 */
export const string_min = {
    validate: (value, _a) => {
        return min.validate(stringCorrection(value), {length: _a.length});
    },
    params: PARAMS
};

/**
 * max length check for string input.
 * the user input will be "corrected" (replacing line breaks), so that client and server side validation are identical
 *
 * @type {{params: [{cast: function(*=): number, name: string}], validate: (function(*=, *): boolean)}}
 */
export const string_max = {
    validate: (value, _a) => {
        return max.validate(stringCorrection(value), {length: _a.length});
    },
    params: PARAMS
};
