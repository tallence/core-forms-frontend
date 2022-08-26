import VueRecaptcha from "vue-recaptcha";
import CoreFormsRecaptcha from "./CoreFormsRecaptcha";

const CoreFormsRecaptchaPlugin = {
  install(_vueInstance, recaptchaApiKey) {
    //3rd party lib
    _vueInstance.component('vue-recaptcha', VueRecaptcha)
    //overwrites and replaces the default dummy implementation - wrapper for 3rd party lib
    _vueInstance.component('core-forms-spam-protection', CoreFormsRecaptcha);

    console.debug('recaptcha activated');
  }
}

export default CoreFormsRecaptchaPlugin;
