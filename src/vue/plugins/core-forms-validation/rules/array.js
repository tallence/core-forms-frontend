/**
 * Validator for array values with a min size restriction
 *
 * @type {{computesRequired: boolean, params: [{cast: function(*=): number, name: string}, {name: string}], validate: (function(*, *): *|boolean|boolean)}}
 */
export const array_min = {
    validate: function (arr, _a) {
        let minSize = _a.min;
        let emptyAllowed = _a.allowEmpty || false;

        return (emptyAllowed && !arr.length) || (arr != null && arr.length >= minSize);
    },
    computesRequired: true,
    params: [
        {
            name: 'min',
            cast: function (value) {
                return Number(value);
            }
        }, {name: 'allowEmpty'}
    ]
};

/**
 * Validator for array values with a max size restrictions
 *
 * @type {{computesRequired: boolean, params: [{cast: function(*=): number, name: string}, {name: string}], validate: (function(*, *): *|boolean|boolean)}}
 */
export const array_max = {
    validate: function (arr, _a) {
        let maxSize = _a.max;
        let emptyAllowed = _a.allowEmpty || false;
        return (emptyAllowed && !arr.length) || (arr != null && arr.length <= maxSize);
    },
    computesRequired: true,
    params: [
        {
            name: 'max',
            cast: function (value) {
                return Number(value);
            }
        }, {name: 'allowEmpty'}
    ]
}

/**
 * Validator for required array values, must contain at least 1 element
 * Integrated as separate validator to be able to use a separate validation message
 *
 * @type {{computesRequired: boolean, params: [], validate: (function(*): boolean|*)}}
 */
export const array_required = {
    validate: function (arr) {
        return (arr != null && arr.length);
    },
    computesRequired: true,
    params: []
};
