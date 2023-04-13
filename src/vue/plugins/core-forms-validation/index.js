import {defineRule, configure, FieldMeta} from "vee-validate"

import {Form as VeeForm} from 'vee-validate'
import {Field as VeeField} from 'vee-validate'

import {required, min_value, max_value, numeric, regex, size, email} from '@vee-validate/rules'
import {localize, setLocale} from '@vee-validate/i18n'

import {string_max, string_min} from "./rules/string"
import {iban} from "./rules/iban"
import {array_max, array_min, array_required} from "./rules/array"
import {file_size_min} from "./rules/filesize"
import CoreFormsValidationMessages from "./messages"
import CoreFormsMessagesPlugin from '../core-forms-messages'


export const CoreFormsValidationRules = {
  REQUIRED: 'required',
  REGEX: 'regex',
  EMAIL: 'email',
  NUMERIC: 'numeric',
  MIN_VALUE: 'min_value',
  MAX_VALUE: 'max_value',
  STRING_MIN: 'string_min',
  STRING_MAX: 'string_max',
  ARRAY_MIN: 'array_min',
  ARRAY_MAX: 'array_max',
  ARRAY_REQUIRED: 'array_required',
  FILE_REQUIRED: 'file_required',
  FILE_SIZE_MIN: 'file_size_min',
  FILE_SIZE_MAX: 'file_size_max',
  IBAN: 'iban'
}

const CoreFormsValidationPlugin = {
  _ADDED_RULES: [],

  _MESSAGES: {
    defaultMessage: '',
    messages: {},
    names: {},
    fields: {}
  },

  install(app, {
    showFieldValidation = true,
    showSummaryValidation = true,
    cssClasses = {}
  }) {

    this.showFieldValidation = showFieldValidation
    this.showSummaryValidation = showSummaryValidation

    //vee components
    app.component('vee-field', VeeField)
    app.component('vee-form', VeeForm)

    //default vee validate rules
    this.addRule(CoreFormsValidationRules.REQUIRED, required)
    this.addRule(CoreFormsValidationRules.MIN_VALUE, min_value)
    this.addRule(CoreFormsValidationRules.MAX_VALUE, max_value)
    this.addRule(CoreFormsValidationRules.NUMERIC, numeric)
    this.addRule(CoreFormsValidationRules.REGEX, regex)
    this.addRule(CoreFormsValidationRules.FILE_REQUIRED, required)
    this.addRule(CoreFormsValidationRules.FILE_SIZE_MAX, size)
    this.addRule(CoreFormsValidationRules.EMAIL, email)

    //custom core forms rules
    this.addRule(CoreFormsValidationRules.STRING_MIN, string_min.validate)
    this.addRule(CoreFormsValidationRules.STRING_MAX, string_max.validate)
    this.addRule(CoreFormsValidationRules.ARRAY_MIN, array_min.validate)
    this.addRule(CoreFormsValidationRules.ARRAY_MAX, array_max.validate)
    this.addRule(CoreFormsValidationRules.ARRAY_REQUIRED, array_required.validate)
    this.addRule(CoreFormsValidationRules.FILE_SIZE_MIN, file_size_min.validate)
    this.addRule(CoreFormsValidationRules.IBAN, iban.validate)

    const getTranslatedMessage = (validationRuleName) => {
      const translationKey = 'validation_' + validationRuleName
      if (app.config.globalProperties.$isTranslationAvailable(translationKey)) {
        return app.config.globalProperties.$isTranslationAvailable(translationKey)
      }
      return CoreFormsValidationMessages[validationRuleName]
    }

    //translation support
    this._MESSAGES.defaultMessage = getTranslatedMessage('default')
    for (const ruleName in CoreFormsValidationRules) {
      this._MESSAGES.messages[ruleName] = getTranslatedMessage(ruleName)
    }

    this.updateMessages()
    setLocale('en')

    //################################################

    /**
     * directive to check if single field validation messages are enabled
     */
    app.directive('validationSingleErrorVisible', {
      inserted: function (el) {
        if (!showFieldValidation && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      }
    })

    /**
     * directive to check if validation summary is enabled or not
     */
    app.directive('validationErrorSummaryVisible', {
      inserted: function (el) {
        if (!showSummaryValidation && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      }
    })


    const validationFunctions = {
      $validationCssClass: (metaObject) => {
        const result = []
        if (metaObject.touched) result.push(cssClasses.touched)
        if (!metaObject.touched) result.push(cssClasses.untouched)
        if (metaObject.validated) result.push(cssClasses.validated)
        if (metaObject.pending) result.push(cssClasses.pending)
        if (metaObject.validated && metaObject.valid && !metaObject.pending) result.push(cssClasses.valid)
        if (metaObject.validated && !metaObject.valid && !metaObject.pending) result.push(cssClasses.invalid)
        return result.filter(s => s != null).join(" ")
      }
    }

    app.config.globalProperties = {...app.config.globalProperties, ...validationFunctions}
    app.mixin({
      methods: {...validationFunctions}
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
    this._ADDED_RULES.push(ruleName)
    defineRule(ruleName, ruleDefinition)
    if (defaultText) {
      this._MESSAGES.messages[ruleName] = defaultText
      this.updateMessages()
    }
  },
  updateMessages() {
    configure({
      generateMessage: localize({en: {...this._MESSAGES}})
    })
  },
  /**
   * adds a message to a validation rule for a given field
   *
   * @param fieldIdentifier   the unique technical name of the field (used as identifier)
   * @param fieldName         the translated field name
   * @param ruleName          the name of the validation rule
   * @param message           the actual validation message
   */
  addValidationMessageForField(fieldIdentifier, fieldName, ruleName, message)  {
    if (this._ADDED_RULES.indexOf(ruleName) !== -1) {
      this._MESSAGES.names[fieldIdentifier] = fieldName
      this._MESSAGES.fields[fieldIdentifier] = this._MESSAGES.fields[fieldIdentifier] || {}
      this._MESSAGES.fields[fieldIdentifier][ruleName] = message

      // it uses "en" as default and fallback, there is no real multi language support;
      // all texts are provided by CM and are already translated and available in the correct language
      this.updateMessages()
    } else {
      console.warn(`skip adding validation messages: unknown rule ${ruleName}. please add the rule first.`)
    }
  },

  getDefaultValidationMessage(ruleName) {
    return this._MESSAGES?.messages[ruleName]
  }
}

export default CoreFormsValidationPlugin
