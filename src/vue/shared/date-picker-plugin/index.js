/* own plugin dependencies */
import DateFieldForm from "./DateFieldForm";
import {DatePickerPluginConstants, MaxDateIsoStringValidator, MinDateIsoStringValidator} from "./imports";

/* dependencies from core and validation plugin */
import CoreFormsPlugin from "../../plugins/core-forms";
import CoreFormsValidationPlugin from "../../plugins/core-forms-validation";

/* 3rd party dependencies */
import {Settings as LuxonSettings} from 'luxon'
import {Datetime as DateTimePicker} from 'vue-datetime';
import DateFieldSummary from "./DateFieldSummary";

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
    install(_vueInstance) {

        //init luxon
        let locale = document.getElementsByTagName("html")[0].getAttribute("lang");
        if (locale) {
            LuxonSettings.defaultLocale = locale;
        }

        //register new validation rules for the added form element
        CoreFormsValidationPlugin.addRule(DatePickerPluginConstants.VALIDATION_RULE_MIN, MinDateIsoStringValidator, "Min date validation failed for field {_field_}.");
        CoreFormsValidationPlugin.addRule(DatePickerPluginConstants.VALIDATION_RULE_MAX, MaxDateIsoStringValidator, "Min date validation failed for field {_field_}.");

        //register the new form field and all required dependencies
        CoreFormsPlugin.registerFormField(_vueInstance, 'DateField', DateFieldForm);
        CoreFormsPlugin.registerSummaryField(_vueInstance, 'SummaryDateField', DateFieldSummary);

        _vueInstance.component('vue-datetime-picker', DateTimePicker);

    },
    config(configData) {
        if (configData.locale && LuxonSettings.defaultLocale !== configData.locale) {
            LuxonSettings.defaultLocale = configData.locale;
        }
    }
};


export default CoreFormsDatePickerFieldPlugin;


