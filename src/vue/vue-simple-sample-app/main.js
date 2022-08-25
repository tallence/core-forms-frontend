/*
This is a simple boilerplate app.
You can use this app as the main app, as a starting point for your own app or integrate the core forms plugin into your existing app.
 */

/*
import base dependencies for the app
 */
import Vue from "vue";
// this simple app doesn't require a Vuex store by itself, but the CoreFormsPlugin depends on it; you can use the base store from the core forms plugin
import store from '../plugins/core-forms/store/base/store';

Vue.config.productionTip = false;
Vue.config.devtools = true;

/*
import core forms dependencies
 */
import VueSimpleSampleApp from "./App";
import CoreFormsPlugin from "../plugins/core-forms";
import CoreFormsMessagesPlugin from "../plugins/core-forms-messages";
import CoreFormsDatePickerFieldPlugin from "../shared/date-picker-plugin";

/*
 this will register the main core forms plugin providing the rendering and validation of the field.
 all user input for a form will be hold in a Vuex Store.
 side effect: so if you have the same form multiple times on the same page, all data will be shared across all forms.
 */
Vue.use(CoreFormsPlugin, {store});

/*
 optional: the datepicker is implemented as a separate plugin.
 using the datepicker will increase the size of the build due to included date picker component and dependency to Luxon
 you can create your own implementation using different libraries if you want to

 remove the following line to completely disable the datepicker field. disable it as valid form field for the studio editor as well.
 */
Vue.use(CoreFormsDatePickerFieldPlugin);

export default {
  /**
   * This call will set up the app instance and mount it to the given dom element.
   *
   * @param selector
   * @param data required data
   * @param texts optional translations
   * @returns {Promise<Vue | object | Record<never, any>>}
   */
  init: async (selector, data = {}, texts = {}) => {
    console.log('starting vue simple sample app with data', {data, texts});

    /*
    init and config the core forms message plugin; store texts and translations
    */
    await CoreFormsMessagesPlugin.config(texts);

    /*
    when you decided to use the DatePickerPlugin, then you can overwrite the default locale for the date picker.
    (defaults to the lang attribute of the page)
    */
    CoreFormsDatePickerFieldPlugin.config({locale: 'de'});

    return new Vue({
      store,
      render: h => h(VueSimpleSampleApp),
      provide: () => { return { ...data }}
    }).$mount(selector)
  }
}
