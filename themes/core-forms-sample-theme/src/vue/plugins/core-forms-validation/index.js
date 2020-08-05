import {localize, ValidationObserver, ValidationProvider} from "vee-validate";
import {max_value, min_value, numeric, regex, required, size} from "vee-validate/dist/rules";

import {configure, extend} from 'vee-validate';

import {string_max, string_min} from "./rules/string";
import {email} from "./rules/email";
import {array_max, array_min, array_required} from "./rules/array";
import {file_size_min} from "./rules/filesize";
import CoreFormsValidationMessages from "./messages";

export const CoreFormsValidationRules = {
  REQUIRED:       'required',
  REGEX:          'regex',
  EMAIL:          'email',
  NUMERIC:        'numeric',
  MIN_VALUE:      'min_value',
  MAX_VALUE:      'max_value',
  STRING_MIN:     'string_min',
  STRING_MAX:     'string_max',
  ARRAY_MIN:      'array_min',
  ARRAY_MAX:      'array_max',
  ARRAY_REQUIRED: 'array_required',
  FILE_REQUIRED:  'file_required',
  FILE_SIZE_MIN:  'file_size_min',
  FILE_SIZE_MAX:  'file_size_max',
}

const _VALIDATION_CONFIG = {
  //set this to false to disable FE validation (e.g. for easier testing of the BE validation)
  validationEnabled: true,
  //this will enable the error messages directly next to the actual form element.
  showFieldValidation: true,
  //this will enable the error summary below the form, all errors are displayed here together.
  showValidationSummary: false,
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
}

const alwaysValid = {
  validate: () => true,
  params: [{'default': null}]
}

const CoreFormsValidationPlugin = {
  _ADDED_RULES: [],
  _MESSAGES: {
    messages: CoreFormsValidationMessages,
    names: {},
    fields: {}
  },
  install(Vue) {
    Vue.component('vee-provider', ValidationProvider);
    Vue.component('vee-observer', ValidationObserver);

    //default vee validate rules
    this.addRule(CoreFormsValidationRules.REQUIRED, required);
    this.addRule(CoreFormsValidationRules.MIN_VALUE, min_value);
    this.addRule(CoreFormsValidationRules.MAX_VALUE, max_value);
    this.addRule(CoreFormsValidationRules.NUMERIC, numeric);
    this.addRule(CoreFormsValidationRules.REGEX, regex);
    this.addRule(CoreFormsValidationRules.FILE_REQUIRED, required);
    this.addRule(CoreFormsValidationRules.FILE_SIZE_MAX, size);

    //custom core forms rules
    this.addRule(CoreFormsValidationRules.STRING_MIN, string_min);
    this.addRule(CoreFormsValidationRules.STRING_MAX, string_max);
    this.addRule(CoreFormsValidationRules.EMAIL, email);
    this.addRule(CoreFormsValidationRules.ARRAY_MIN, array_min);
    this.addRule(CoreFormsValidationRules.ARRAY_MAX, array_max);
    this.addRule(CoreFormsValidationRules.ARRAY_REQUIRED, array_required);
    this.addRule(CoreFormsValidationRules.FILE_SIZE_MIN, file_size_min);

    //this initializes the default translation messages.
    localize({en: this._MESSAGES});

    Vue.prototype.$addValidationMessageForField = this.addValidationMessageForField;
    Vue.prototype.$getDefaultValidationMessage = this.getDefaultValidationMessage;

    configure(_VALIDATION_CONFIG);

    /**
     * directive to check if single field validation messages are enabled
     */
    Vue.directive('validationSingleErrorVisible', {
      inserted: function (el, binding, vnode) {
        if (!_VALIDATION_CONFIG.showFieldValidation && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      }
    })

    /**
     * directive to check if validation summary is enabled or not
     */
    Vue.directive('validationErrorSummaryVisible', {
      inserted: function (el, binding, vnode) {
        if (!_VALIDATION_CONFIG.showValidationSummary && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      }
    })
  },
  /**
   * registers a new validation rule to VeeValidate
   *
   * @param ruleName          the name of the rule
   * @param ruleDefinition    optional parameters for the validation
   * @param defaultText       a default validation message for the rule
   */
  addRule(ruleName, ruleDefinition, defaultText) {
    this._ADDED_RULES.push(ruleName);
    extend(ruleName, _VALIDATION_CONFIG.validationEnabled ? ruleDefinition : alwaysValid);
    if (defaultText) {
      this._MESSAGES.messages[ruleName] = defaultText;
      localize({en: this._MESSAGES});
    }
  },
  /**
   * adds a message to a validation rule for a given field
   *
   * @param fieldIdentifier   the unique technical name of the field (used as identifier)
   * @param fieldName         the translated field name
   * @param ruleName          the name of the validation rule
   * @param message           the actual validation message
   */
  addValidationMessageForField(fieldIdentifier, fieldName, ruleName, message) {
    if (this._ADDED_RULES.indexOf(ruleName) !== -1) {
      this._MESSAGES.names[fieldIdentifier] = fieldName;
      this._MESSAGES.fields[fieldIdentifier] = this._MESSAGES.fields[fieldIdentifier] || {};
      this._MESSAGES.fields[fieldIdentifier][ruleName] = message;

      // it uses "en" as default and fallback, there is no real multi language support;
      // all texts are provided by CM and are already translated and available in the correct language
      localize({en: this._MESSAGES});
    } else {
      console.warn(`skip adding validation messages: unknown rule ${ruleName}. please add the rule first.`);
    }
  },
  /**
   * returns the default validation message for a given rule
   *
   * @param ruleName
   * @returns {*}
   */
  getDefaultValidationMessage(ruleName) {
    return this._MESSAGES.messages[ruleName];
  }
};

export default CoreFormsValidationPlugin;
