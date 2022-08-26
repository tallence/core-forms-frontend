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

  VALIDATION_FAILED: 'core-forms.validation-failed',

  // those events will be fired when the form page changes
  WIZARD_STARTED: 'core-forms.wizard-started',
  WIZARD_NEXT_PAGE: 'core-forms.wizard-next',
  WIZARD_PREV_PAGE: 'core-forms.wizard-prev',
  WIZARD_NAVIGATION: 'core-forms.wizard-navigation',
  WIZARD_COMPLETED: 'core-forms.wizard-completed',
};

/**
 * Helper to send events out of the app
 */
export const EventSender = {
  _ROOT: undefined,
  init(root) {
    this._ROOT = root;
  },
  send(trigger, data) {
    if (this._ROOT) {

      data = data || {};
      data.url = this._ROOT.$store.getters['coreForms/getFormSource'];

      this._ROOT.$emit(EventConstants.GLOBAL_EVENT,
        {
          trigger: trigger,
          data: data
        });
    }
  }
};
