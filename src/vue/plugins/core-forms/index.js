import CoreFormsValidationPlugin from "../core-forms-validation"
import CoreFormsMessagesPlugin from "../core-forms-messages"

import CoreFormsUtils from './common/util'
import {EventConstants, EventSender} from './common/events'
import coreFormsStore from "./store"
import FormElement from "./FormElement"
import FormElementHint from "./components/FormElementHint"
import ErrorContainer from "./components/ErrorContainer"
import LoadingSpinner from "./components/LoadingSpinner"
import VueRecaptcha from "vue-recaptcha"
import {DebounceDirective} from "./common/debounce"
import Form from "./Form"

const getComponentNameFromFile = (fileName) => {
  return (fileName || 'Unknown').split('/').pop().replace('.vue', '').replace('.js', '')
}

const CoreFormsPlugin = {
  install(Vue, {store}) {
    if (!store) {
      throw new Error("Please provide vuex store.")
    }
    store.registerModule('coreForms', coreFormsStore)
    Vue.$coreFormsStore = coreFormsStore

    Vue.use(CoreFormsMessagesPlugin)
    Vue.use(CoreFormsValidationPlugin)

    //register all available form element templates
    const requireFormFields = require.context('./form-fields', false, /[A-Z]\w+\.(vue|js)$/)
    requireFormFields.keys().forEach(fileName => CoreFormsUtils.registerFieldType(Vue, getComponentNameFromFile(fileName), requireFormFields(fileName), true))

    //register all available summary element templates
    const requireSummaryFields = require.context('./summary-fields', false, /[A-Z]\w+\.(vue|js)$/)
    requireSummaryFields.keys().forEach(fileName => CoreFormsUtils.registerFieldType(Vue, getComponentNameFromFile(fileName), requireSummaryFields(fileName), false))

    Vue.component('core-forms', Form)
    Vue.component('form-element-wrapper', FormElement)
    Vue.component('form-element-hint', FormElementHint)
    Vue.component('form-error-wrapper', ErrorContainer)
    Vue.component('form-load-spinner', LoadingSpinner)
    Vue.component('vue-recaptcha', VueRecaptcha)
    Vue.directive('debounce', DebounceDirective)

    Vue.filter('columnClass', function (advancedSettings) {
      let columnClass = advancedSettings['columnWidth'] ? advancedSettings['columnWidth'] : 12
      let forcedSpacing = advancedSettings['rightMargin'] ? advancedSettings['rightMargin'] : 0
      return `col-xs-12 col-md-${columnClass}` + (forcedSpacing === 0 ? '' : ` offset-md-${forcedSpacing}-right`)
    });
  },
  registerFormField(_vueInstance, componentName, componentConfig) {
    CoreFormsUtils.registerFieldType(_vueInstance, componentName, componentConfig, true)
  },
  registerSummaryField(_vueInstance, componentName, componentConfig) {
    CoreFormsUtils.registerFieldType(_vueInstance, componentName, componentConfig, false)
  }
}

export default CoreFormsPlugin
export {
  CoreFormsUtils,
  EventConstants as CoreFormsEvents,
  EventSender as CoreFormsEventSender
}

