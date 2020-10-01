import {CoreFormsEvents} from '../vue/plugins/core-forms';

/**
 * JS Wrapper to attach a new Vue app instance to an existing DOM node
 */
export default class CoreFormsApplication {

  constructor(domNode, appToUse, eventListenerFn) {
    this.node = domNode;

    this.initApp(appToUse).then(() => this.addEventListener(eventListenerFn));
  }

  async initApp(appToUse) {
    const uniqueId = '_' + Math.random().toString(36).substr(2, 9)
    this.node.setAttribute('core-forms-unique-id', uniqueId);

    await appToUse.init(`[core-forms-unique-id="${uniqueId}"]`, this.getAppData(), this.getMessages());
  }

  getAppData() {
    return {
      formUrl:        this.node.dataset['appRemoteUrl'],
      recaptchaKey:   this.node.dataset['appRecaptchaSitekey']
    }
  }

  getMessages() {
    return {
      submitButton:       this.node.dataset['messagesSubmitButton'],
      submitActive:       this.node.dataset['messagesSubmitActive'],
      inputClose:         this.node.dataset['messagesInputClose'],
      inputOptionDefault: this.node.dataset['messagesInputOptionDefault'],
      inputFileEmpty:     this.node.dataset['messagesInputFileEmpty'],
      inputFileRemove:    this.node.dataset['messagesInputFileRemove'],
      inputFileBrowse:    this.node.dataset['messagesInputFileBrowse'],
      inputMandatory:     this.node.dataset['messagesInputMandatory'],
      successPageTitle:   this.node.dataset['messagesSuccessPageTitle'],
      successPageText:    this.node.dataset['messagesSuccessPageText'],
      successPageButton:  this.node.dataset['messagesSuccessPageButton'],
      errorPageTitle:     this.node.dataset['messagesErrorPageTitle'],
      errorPageText:      this.node.dataset['messagesErrorPageText'],
      errorPageButton:    this.node.dataset['messagesErrorPageButton'],
      errorGlobal:        this.node.dataset['messagesErrorGlobal']
    }
  }

  addEventListener(eventListenerFn) {

    const listener = (event) => {
      if (event['coreForms'] != null) {

        if (typeof eventListenerFn == "function") {
          eventListenerFn(event['coreForms']['trigger'], event['coreForms']['data']);
          return;
        }

        switch (event['coreForms']['trigger']) {
          case CoreFormsEvents.SUBMIT_CONFIRMED:
            console.log('success confirmed');
            break;
          case CoreFormsEvents.APPLICATION_LOADED:
            console.log('app loaded');
            break;
          case CoreFormsEvents.FORM_LOADED:
            console.log('form loaded');
            break;
          case CoreFormsEvents.FORM_FAILED:
            console.log('form failed');
            break;
          case CoreFormsEvents.FORM_SUBMITTED:
            console.log('form submitted');
            break;
          default:
        }
      }
    }

    if (typeof eventListenerFn == "function") {
      this.node.removeEventListener(CoreFormsEvents.GLOBAL_EVENT, listener);
    }
    this.node.addEventListener(CoreFormsEvents.GLOBAL_EVENT, listener);
  }
}

