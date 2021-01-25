import {DateTime as LuxonDateTime} from "luxon"

export const DatePickerPluginConstants = {
  VALIDATION_RULE_MIN: 'date_min',
  VALIDATION_RULE_MAX: 'date_max',
}

/**
 * validator for maximum date in a datepicker component.
 * for date comparison the time stamp is not relevant
 * the model is based on ISO8601 strings, so we can do simple string compare instead of date object comparison
 *
 * @type {{params: [{name: string}], validate: MinDateIsoStringValidator.validate}}
 */
export const MinDateIsoStringValidator = {
    validate: (value, _a) => {
        if (value != null && _a['date'] != null) {
            return toISODate(value).localeCompare(toISODate(_a.date)) >= 0;
        }
        return true;
    },
    params: [{name: 'date'}]
};

/**
 * validator for minimum date in a datepicker component.
 * for date comparison the time stamp is not relevant
 * the model is based on ISO8601 strings, so we can do simple string compare instead of date object comparison;
 *
 * @type {{params: [{name: string}], validate: MaxDateIsoStringValidator.validate}}
 */
export const MaxDateIsoStringValidator = {
    validate: (value, _a) => {
        if (value != null && _a['date'] != null) {
            return toISODate(value).localeCompare(toISODate(_a.date)) <= 0;
        }
        return true;
    },
    params: [{name: 'date'}]
};

export const formatDate = (value, pattern) => {
    if (value != null) {
        return LuxonDateTime.fromISO(value).toFormat(pattern);
    }
    return undefined;
}



/**
 * helper method to get rid of the timestamp
 * @param value
 * @returns {string}
 */
const toISODate = (value) => {
    if (value != null) {
      return LuxonDateTime.fromISO(value).toISODate();
    }
    return '';
}
