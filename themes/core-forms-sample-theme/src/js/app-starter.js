import $ from 'jquery';

import {CoreFormsEvents} from '../vue/plugins/core-forms';

/**
 * this wraps the vue application inside a jquery plugin
 */
(function ($) {
  async function VueAppPlugin(element, appToUse) {

    const $element = $(element);
    const uniqueId = '_' + Math.random().toString(36).substr(2, 9)
    $element.attr('core-forms-unique-id', uniqueId)

    const applicationData = $element.data();
    /*
    some important data needs to be passed to the vue app,
    required data is provided via data-attributes, they will get stored in a vuex store for further usage inside the app
    */
    const appData = {};
    appData['formUrl'] = applicationData['appRemoteUrl'];
    appData['recaptchaKey'] = applicationData['appRecaptchaSitekey'];

    /*
    see locales/defaults.js for required messages; they can be overridden during init
    in this example they are part of the dom structure, feel free to modify this behavior
    */
    const messages = {
      submitButton: applicationData['messagesSubmitButton'],
      submitActive: applicationData['messagesSubmitActive'],
      inputClose: applicationData['messagesInputClose'],
      inputOptionDefault: applicationData['messagesInputOptionDefault'],
      inputFileEmpty: applicationData['messagesInputFileEmpty'],
      inputFileRemove: applicationData['messagesInputFileRemove'],
      inputFileBrowse: applicationData['messagesInputFileBrowse'],
      inputMandatory: applicationData['messagesInputMandatory'],
      inputCopyMail: applicationData['messagesCopyMail'],
      successPageTitle: applicationData['messagesSuccessPageTitle'],
      successPageText: applicationData['messagesSuccessPageText'],
      successPageButton: applicationData['messagesSuccessPageButton'],
      errorPageTitle: applicationData['messagesErrorPageTitle'],
      errorPageText: applicationData['messagesErrorPageText'],
      errorPageButton: applicationData['messagesErrorPageButton'],
      errorGlobal: applicationData['messagesErrorGlobal']
    }

    appToUse.init(`[core-forms-unique-id="${uniqueId}"]`, appData, messages).then((_vueInstance_) => {

      /**
       * the core forms plugin of the app itself sends an global event for various actions, e.g. form loaded, request failed, form submitted, ...
       * all events are emitted at root level of the application.
       * this is an example how you can access it from your scripts, it might be required for tracking user data (e.g. Google Analytics/TagManager) or similar.
       */
      _vueInstance_.$on(CoreFormsEvents.GLOBAL_EVENT, (event) => {

        switch (event.trigger) {
          case CoreFormsEvents.SUBMIT_CONFIRMED:
            console.info('EVENTLOG: success confirmed', event.data);
            break;
          case CoreFormsEvents.APPLICATION_LOADED:
            console.info('EVENTLOG: app loaded', event.data);
            break;
          case CoreFormsEvents.FORM_LOADED:
            console.info('EVENTLOG: form loaded', event.data);
            break;
          case CoreFormsEvents.FORM_FAILED:
            console.info('EVENTLOG: form failed', event.data);
            break;
          case CoreFormsEvents.FORM_SUBMITTED:
            console.info('EVENTLOG: form submitted', event.data);
            break;
          default:
        }

      });
    });
  }

  $.fn.vueSampleApp = function (appToUse) {
    this.each(async function () {
      new VueAppPlugin(this, appToUse)
    });
    return this;
  };

})($);

