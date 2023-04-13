import CoreFormsRecaptcha from "./CoreFormsRecaptcha"
import CoreFormsCaptcha from './CoreFormsCaptcha.vue'

export const CoreFormsCaptchaConstants = {
  COMPONENT_NAME: 'core-forms-captcha',
  EVENTS: {
    READY: 'onCaptchaReady',
    STARTED: 'onCaptchaStarted',
    COMPLETED: 'onCaptchaCompleted',
    FAILED: 'onCaptchaFailed'
  }
}

const CoreFormsCaptchaPlugin = {
  install(app, {recaptchaSitekey = null}) {

    //based on the provided data, the sample app will only include recaptcha or a placeholder component

    if (recaptchaSitekey) {
      app.provide('recaptchaSitekey', recaptchaSitekey)
      app.component(CoreFormsCaptchaConstants.COMPONENT_NAME, CoreFormsRecaptcha)
      return
    }

    //You can provide your own captcha plugins here, e.g. FriendlyCaptcha.
    //As long as the component sends out the same events/callbacks as the existing ones, no further customizations to the form itself have to be made.


    //no other captcha solution was registered yet, make sure to add a  dummy component instead: this one always resolves to a valid captcha
    app.component(CoreFormsCaptchaConstants.COMPONENT_NAME, CoreFormsCaptcha)
  }
}

export default CoreFormsCaptchaPlugin
