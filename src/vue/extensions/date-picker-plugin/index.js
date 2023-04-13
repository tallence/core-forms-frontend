/* own plugin dependencies */
import DateFieldForm from './DateFieldForm'
import DateFieldSummary from './DateFieldSummary'

import {DatePickerPluginConstants, MaxDateIsoStringValidatorFn, MinDateIsoStringValidatorFn} from './imports'

/* dependencies from core and validation plugin */
import {CoreFormsUtils} from '../../plugins/core-forms'
import CoreFormsValidationPlugin from '../../plugins/core-forms-validation'

/* 3rd party dependencies */
import VueDatePicker from '@vuepic/vue-datepicker'

/**
 * This is a simple example how additional fields can be integrated into the core forms app.
 *
 * This plugin adds the DateField type to the form.
 * To register a new field type, the following steps are required:
 *
 * - (A) ADD FIELD TYPE:
 * the plugin needs to register the new field type to the Core Plugin; otherwise it won't be rendered.
 *
 * - (B) ADD VALIDATION RULES
 * the DateField brings in some new client side validation types. The new validators are based on vee-validate and need to be registered with the ValidationPlugin.
 *
 * - (C) IMPLEMEMT VIEW DETAILS
 * See DateField.vue for implementation details.
 * The view component itself includes the CoreFormsBaseValidationMixin, this will add the required properties to the field. and only registers its required validators
 * Wrap your component in <base-form-element> for validation support and the basic markup (labels, hints... ).
 * Add the new validation rules based on the settings from the form definition JSON structure.
 *
 * - dont forget to include your styles in the main app or wherever your plugin is used.
 *
 * Done. Your new field is now ready to use.
 *
 * @type {{install(*=): void, config(*): void}}
 */
const CoreFormsDatePickerFieldPlugin = {
  install(app, { locale, maxYears, minDateDefaultText, maxDateDefaultText }) {

    //init locale, required for output
    let datepickerLocale = locale || document.getElementsByTagName("html")[0].getAttribute("lang") || DatePickerPluginConstants.DEFAULT_LOCALE
    app.provide('datePickerLocale', datepickerLocale)
    app.provide('maxYears', maxYears || DatePickerPluginConstants.MAX_YEARS)

    //register new validation rules for the added form element
    CoreFormsValidationPlugin.addRule(DatePickerPluginConstants.VALIDATION_RULE_MIN, MinDateIsoStringValidatorFn, minDateDefaultText || "Min date validation failed for field {_field_}.")
    CoreFormsValidationPlugin.addRule(DatePickerPluginConstants.VALIDATION_RULE_MAX, MaxDateIsoStringValidatorFn, maxDateDefaultText || "Max date validation failed for field {_field_}.")

    //register the new form field and all required dependencies
    CoreFormsUtils.registerField(app, DatePickerPluginConstants.FIELD_NAME, DateFieldForm, DateFieldSummary)

    //register 3rd party date picker component
    app.component('DatePicker', VueDatePicker);
  }
}


export default CoreFormsDatePickerFieldPlugin


