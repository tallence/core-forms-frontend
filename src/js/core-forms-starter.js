/*
  Theme core-forms-sample: Main javascript entry point
 */
import {CoreFormsEvents} from '../vue/plugins/core-forms'
import CoreFormsApplication from '../vue/vue-example-app'

export default class CoreFormsStarter {
  constructor(domNode) {
    this.node = domNode

    const uniqueId = '_' + Math.random().toString(36).substr(2, 9)
    this.node.setAttribute('core-forms-unique-id', uniqueId)

    new CoreFormsApplication(`[core-forms-unique-id="${uniqueId}"]`, {
        applicationData: this.getAppData(),
        messages: this.getMessages()
      },
      this.eventCallback)
  }

  getAppData() {
    return {
      formUrl: this.node.dataset['appRemoteUrl'],
      recaptchaSitekey: this.node.dataset['appRecaptchaSitekey']
    }
  }

  getMessages() {
    return {
      submitButton: this.node.dataset['messagesSubmitButton'],
      prevPageButton: this.node.dataset['messagesPrevPageButton'],
      nextPageButton: this.node.dataset['messagesNextPageButton'],
      submitActive: this.node.dataset['messagesSubmitActive'],
      inputClose: this.node.dataset['messagesInputClose'],
      inputOptionDefault: this.node.dataset['messagesInputOptionDefault'],
      inputFileEmpty: this.node.dataset['messagesInputFileEmpty'],
      inputFileRemove: this.node.dataset['messagesInputFileRemove'],
      inputFileBrowse: this.node.dataset['messagesInputFileBrowse'],
      inputCopyMail: this.node.dataset['messagesInputCopyMail'],
      inputMandatory: this.node.dataset['messagesInputMandatory'],
      successPageTitle: this.node.dataset['messagesSuccessPageTitle'],
      successPageText: this.node.dataset['messagesSuccessPageText'],
      successPageButton: this.node.dataset['messagesSuccessPageButton'],
      errorPageTitle: this.node.dataset['messagesErrorPageTitle'],
      errorPageText: this.node.dataset['messagesErrorPageText'],
      errorPageButton: this.node.dataset['messagesErrorPageButton'],
      errorGlobal: this.node.dataset['messagesErrorGlobal']
    }
  }

  eventCallback(event) {
    if (event != null) {

      //default event handling
      switch (event['trigger']) {
        case CoreFormsEvents.SUBMIT_CONFIRMED:
          console.log('CoreForms: success confirmed', event['data'])
          break
        case CoreFormsEvents.APPLICATION_LOADED:
          console.log('CoreForms: app loaded', event['data'])
          break
        case CoreFormsEvents.FORM_LOADED:
          console.log('CoreForms: form loaded', event['data'])
          break
        case CoreFormsEvents.FORM_FAILED:
          console.log('CoreForms: form failed', event['data'])
          break
        case CoreFormsEvents.FORM_SUBMITTED:
          console.log('CoreForms: form submitted', event['data'])
          break
        case CoreFormsEvents.WIZARD_STARTED:
          console.log('CoreForms: wizard started', event['data'])
          break
        case CoreFormsEvents.WIZARD_NAVIGATION:
          console.log('CoreForms: wizard navigation', event['data'])
          break
        case CoreFormsEvents.WIZARD_PREV_PAGE:
          console.log('CoreForms: wizard previous page', event['data'])
          break
        case CoreFormsEvents.WIZARD_NEXT_PAGE:
          console.log('CoreForms: wizard next page', event['data'])
          break
        case CoreFormsEvents.WIZARD_COMPLETED:
          console.log('CoreForms: wizard completed', event['data'])
          break
        case CoreFormsEvents.VALIDATION_FAILED:
          console.log('CoreForms: validation failed', event['data'])
          break
        case CoreFormsEvents.SPAM_PROTECT_SUCCESS:
          console.log('CoreForms: spam protection passed', event['data'])
          break
        case CoreFormsEvents.SPAM_PROTECT_FAILED:
          console.log('CoreForms: spam protection failed', event['data'])
          break
        default:
      }
    }
  }
}
