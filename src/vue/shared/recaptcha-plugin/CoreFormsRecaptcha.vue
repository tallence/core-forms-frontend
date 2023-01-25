<template>
  <!-- recaptcha is only required on the last page -->
  <vue-recaptcha v-if="recaptchaKey"
                 :sitekey="recaptchaKey"
                 ref="recaptcha"
                 size="invisible"
                 @verify="onValidationSuccess"
                 @render="onCaptchaRendered"
                 @expired="onCaptchaExpired"
                 @error="onValidationFailure"
                 :loadRecaptchaScript="true">
  </vue-recaptcha>
</template>

<script>

import BaseSpamProtection from "../../plugins/core-forms/components/BaseSpamProtection";

export default {
  extends: BaseSpamProtection,
  inject: ['recaptchaKey'],
  methods: {
    /* overwrite default methods  */

    execute() {
        if (this.$refs.recaptcha) {
          this.$refs.recaptcha.execute();
        } else {
          if (this.recaptchaKey != null) {
            this.onValidationFailure();
          } else {
            this.onValidationSuccess();
          }
        }
    },
    reset() {
      this.onCaptchaExpired();
    },

    /* other recaptcha callbacks */

    onCaptchaRendered() {
      this.$emit('onRendered')
    },
    onCaptchaExpired() {
      if (this.$refs.recaptcha) {
        this.$refs.recaptcha.reset()
      }
    },
  }
}
</script>
