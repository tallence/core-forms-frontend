import CoreFormsValidationPlugin from "../core-forms-validation";
import CoreFormsMessagesPlugin from "../core-forms-messages";

import CoreFormsUtils from './common/util';
import {EventConstants, EventSender} from './common/events';
import coreFormsStore from "./store";
import FormElement from "./FormElement";
import FormElementHint from "./components/FormElementHint";
import ErrorContainer from "./components/ErrorContainer";
import LoadingSpinner from "./components/LoadingSpinner";
import VueRecaptcha from "vue-recaptcha";
import {DebounceDirective} from "./common/debounce";
import Form from "./Form";

const CoreFormsPlugin = {
  install(Vue, {store}) {
    if (!store) {
      throw new Error("Please provide vuex store.");
    }
    store.registerModule('coreForms', coreFormsStore);
    Vue.$coreFormsStore = coreFormsStore;

    Vue.use(CoreFormsMessagesPlugin);
    Vue.use(CoreFormsValidationPlugin);

    //register all available form element templates
    const requireComponent = require.context('./fields', false, /[A-Z]\w+\.(vue|js)$/);
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName);
      const componentName = fileName.split('/').pop().replace('.vue', '');
      this.registerFormField(Vue, componentName, componentConfig);
    });

    Vue.component('core-forms', Form);
    Vue.component('form-element-wrapper', FormElement);
    Vue.component('form-element-hint', FormElementHint);
    Vue.component('form-error-wrapper', ErrorContainer);
    Vue.component('form-load-spinner', LoadingSpinner);
    Vue.component('vue-recaptcha', VueRecaptcha);
    Vue.directive('debounce', DebounceDirective);

    Vue.filter('columnClass', function (advancedSettings) {
      let columnClass = advancedSettings['columnWidth'] ? advancedSettings['columnWidth'] : 12;
      let forcedSpacing = advancedSettings['rightMargin'] ? advancedSettings['rightMargin'] : 0;
      return `col-xs-12 col-md-${columnClass}` + (forcedSpacing === 0 ? '' : ` offset-md-${forcedSpacing}-right`);
    });
  },
  registerFormField(_vueInstance, componentName, componentConfig) {
    _vueInstance.options.$coreFormsFields = _vueInstance.options.$coreFormsFields || [];
    _vueInstance.options.$coreFormsFields.push(componentName);
    _vueInstance.component(componentName, componentConfig.default || componentConfig);
  }
};

export default CoreFormsPlugin;
export {
  CoreFormsUtils,
  EventConstants as CoreFormsEvents,
  EventSender as CoreFormsEventSender
};

