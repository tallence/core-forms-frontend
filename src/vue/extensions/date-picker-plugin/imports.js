export const DatePickerPluginConstants = {
  FIELD_NAME: 'DateField',

  MAX_YEARS: 5,
  DEFAULT_LOCALE: 'en-GB',

  VALIDATION_RULE_MIN: 'date_min',
  VALIDATION_RULE_MAX: 'date_max'
}

/**
 * validator for maximum date in a datepicker component.
 * for date comparison the time stamp is not relevant
 * the model is based on ISO8601 strings, so we can do simple string compare instead of date object comparison
 *
 * @type {{params: [{name: string}], validate: MinDateIsoStringValidator.validate}}
 */
export const MinDateIsoStringValidatorFn = (value, _a) => {
  if (value != null && _a['date'] != null) {
    return value.localeCompare(_a.date) >= 0
  }
  return true
}

/**
 * validator for minimum date in a datepicker component.
 * for date comparison the time stamp is not relevant
 * the model is based on ISO8601 strings, so we can do simple string compare instead of date object comparison;
 *
 * @type {{params: [{name: string}], validate: MaxDateIsoStringValidator.validate}}
 */
export const MaxDateIsoStringValidatorFn = (value, _a) => {
  if (value != null && _a['date'] != null) {
    return value.localeCompare(_a.date) <= 0
  }
  return true
}

const prefixNumber = (number) => number < 10 ? '0' + number : number

export const formatDateForUser = (dateValue, locale = DatePickerPluginConstants.DEFAULT_LOCALE) => {
  if (dateValue == null) return ''
  let formatted = dateValue.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  return formatted
}

export const formatDateToIso = (dateValue) => {
  if (dateValue == null) return null
  //convert to iso without using any other library, we do not care about any time information (for now)
  return `${dateValue.getFullYear()}-${prefixNumber(dateValue.getMonth() + 1)}-${prefixNumber(dateValue.getDate())}T00:00:00Z`
}


