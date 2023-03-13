import CoreFormsValidationPlugin from "../core-forms-validation"
import CoreFormsMessagesPlugin from "../core-forms-messages"
import CoreFormsCaptchaPlugin from '../core-forms-captcha'

import CoreFormsUtils from './common/util'
import {EventConstants, EventSender} from './common/events'

import FormWizard from "./wizard/FormWizard"
import FormWizardStep from "./wizard/FormWizardStep"
import FormElement from "./components/FormElement"
import FormElementHint from "./components/FormElementHint"
import ErrorContainer from "./components/ErrorContainer"
import LoadingSpinner from "./components/LoadingSpinner"
import {createPinia} from "pinia"

import {DebounceDirective} from "./common/debounce"
import BaseSpamProtection from "./components/BaseSpamProtection"
import {useCoreFormsStore} from './common/store'
import Form from './Form.vue'
import FormFields from './FormFields.vue'
import FormSummary from './FormSummary.vue'

const getComponentNameFromFile = (fileName) => {
  return (fileName || 'Unknown').split('/').pop().replace('.vue', '').replace('.js', '')
}


const CoreFormsPlugin = {
  install(app, {applicationData = {}, messages = {}}) {
    let self = this

    app.provide("formUrl", applicationData.formUrl)

    //initialise store
    const pinia = createPinia()
    app.use(pinia)
    app.config.globalProperties.$store = useCoreFormsStore()

    //required plugin: messages plugin to provide easier translations
    app.use(CoreFormsMessagesPlugin, messages)

    //add captcha support, if a recaptcha sitekey was provided: use Recaptcha, otherwise placeholder captcha
    app.use(CoreFormsCaptchaPlugin, { recaptchaSitekey: applicationData.recaptchaSitekey })

    //required plugin: validation plugin
    app.use(CoreFormsValidationPlugin, {
      showSummaryValidation: true,
      showFieldValidation: true,
      cssClasses: {
        valid: 'is-valid',
        invalid: 'is-invalid',
        pending: 'is-validating',
        validated: 'is-validated',
        touched: 'is-touched',
        untouched: 'is-untouched'
      }
    })

    //register all available form element templates
    const requireFormFields = require.context('./form-fields', false, /[A-Z]\w+\.(vue|js)$/)
    requireFormFields.keys().forEach(fileName => CoreFormsUtils.registerFieldType(app, getComponentNameFromFile(fileName), requireFormFields(fileName), true))

    //register all available summary element templates
    const requireSummaryFields = require.context('./summary-fields', false, /[A-Z]\w+\.(vue|js)$/)
    requireSummaryFields.keys().forEach(fileName => CoreFormsUtils.registerFieldType(app, getComponentNameFromFile(fileName), requireSummaryFields(fileName), false))

    //required components
    app.component('core-forms', Form)
    app.component('form-element', FormElement)
    app.component('form-element-hint', FormElementHint)
    app.component('form-error-wrapper', ErrorContainer)
    app.component('form-load-spinner', LoadingSpinner)
    app.component('form-wizard', FormWizard)
    app.component('form-wizard-step', FormWizardStep)
    app.component('form-fields', FormFields)
    app.component('form-summary', FormSummary)

    app.component('core-forms-spam-protection', BaseSpamProtection)
    app.directive('debounce', DebounceDirective)

    const _columnCssClassFn = (advancedSettings) => {
      const columnClass = advancedSettings['columnWidth'] ? advancedSettings['columnWidth'] : 12
      const forcedSpacing = advancedSettings['rightMargin'] ? advancedSettings['rightMargin'] : 0
      return `col-xs-12 col-md-${columnClass}` + (forcedSpacing === 0 ? '' : ` offset-md-${forcedSpacing}-right`)
    }

    const _fieldCssClassFn = (field, hideHint = false) => {
      if (!field) return ""
      return `form-group core-forms__field ${field.hint && !hideHint ? 'core-forms__field-with-hint' : ''} core-forms__field-${field.type.toLowerCase()}`
    }

    const coreFunctions = {
      $columnCssClass: _columnCssClassFn,
      $fieldCssClass: _fieldCssClassFn,
      $isFieldSupported: (fieldName, isFormFieldType = true) => {
        return CoreFormsUtils.isFieldTypeSupported(app, fieldName, isFormFieldType)
      }
    }

    app.config.globalProperties = {...app.config.globalProperties, ...coreFunctions}
    app.mixin({
      methods: {...coreFunctions}
    })
  }
}

export default CoreFormsPlugin
export {
  CoreFormsUtils,
  EventConstants as CoreFormsEvents,
  EventSender as CoreFormsEventSender
}

