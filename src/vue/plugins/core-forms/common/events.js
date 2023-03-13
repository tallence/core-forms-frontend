import emitter from 'tiny-emitter/instance'
import {useCoreFormsStore} from './store'

/**
 * Constants
 */
export const EventConstants = {
  //the name of the event which will be emitted to the source element which triggered the app process
  GLOBAL_EVENT: 'core-forms.event',
  //will be fired when the application is ready and initialized
  APPLICATION_LOADED: 'core-forms.ready',
  //will be fired when the form successfully loaded
  FORM_LOADED: 'core-forms.form-loaded',
  //will be fired when the loading of the form failed
  FORM_FAILED: 'core-forms.form-failed',
  //will be fired after the user clicked to submit the form, but before the data got submitted
  FORM_SUBMIT: 'core-forms.form-submit',
  //will be fired after the user submitted the form
  FORM_SUBMITTED: 'core-forms.form-submitted',
  //will be fired after the user clicked the button on the success page
  SUBMIT_CONFIRMED: 'core-forms.submit-confirmed',

  //will be fired after the user clicked the button on the success page
  VALIDATION_FAILED: 'core-forms.validation-failed',
  //will be fired after the user clicked the button on the success page
  SPAM_PROTECT_FAILED: 'core-forms.spam-protect-failed',
  SPAM_PROTECT_SUCCESS: 'core-forms.spam-protect-success',

  // those events will be fired when the form page changes
  WIZARD_STARTED: 'core-forms.wizard-started',
  WIZARD_NEXT_PAGE: 'core-forms.wizard-next',
  WIZARD_PREV_PAGE: 'core-forms.wizard-prev',
  WIZARD_NAVIGATION: 'core-forms.wizard-navigation',
  WIZARD_COMPLETED: 'core-forms.wizard-completed'
}

/**
 * Helper to send events out of the app
 */
export const EventSender = {
  send(trigger, data) {
    const {formSource} = useCoreFormsStore();

    //prepare (global) data to be attached to the event
    data = data || {}
    data.url = formSource

    EventBus.$emit(EventConstants.GLOBAL_EVENT, {
      trigger: trigger,
      data: data
    })
  }
}


export const EventBus = {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args)
}
