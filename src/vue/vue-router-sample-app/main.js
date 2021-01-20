/*
This is a simple boilerplate app using Vuex and Vue Router.
You can use this app as the main app, as a starting point for your own app or integrate the core forms plugin into your existing app.

This implementation uses Vuex Store, so if your existing app doesn't use it, please add it to your project.
 */

/*
import base dependencies for the app
 */
import Vue from "vue";
import VueRouterSampleApp from "./App";
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.config.devtools = false;

/*
import core forms dependencies
 */
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

    console.log('starting vue router sample app with data', {data, texts});

    /*
     this call simply stores initial data for the application itself,
     you can pass the data to the app in other ways as well
     */
    await store.dispatch('setAppData', data);

    /*
    init and config the core forms message plugin; store texts and translations
     */
    await CoreFormsMessagesPlugin.config(texts);

    /*
    when you decided to use the DatePickerPlugin, then you can overwrite the default locale for the date picker.
    (defaults to the lang attribute of the page)
    */
    //CoreFormsDatePickerFieldPlugin.config({locale: 'de'});

    return new Vue({
      router,
      store,
      render: h => h(VueRouterSampleApp)
    }).$mount(selector);
  }
}
