<template>
  <VueRecaptcha ref="recaptcha"
                size="invisible"
                @verify="onRecaptchaVerify"
                @render="onRecaptchaRendered"
                @expired="onRecaptchaExpired"
                @error="onRecaptchaError"
                :loadRecaptchaScript="true">
  </VueRecaptcha>
</template>

<script>
import CoreFormsCaptcha from './CoreFormsCaptcha.vue'
import VueRecaptcha from './vue-recaptcha'

export default {
  extends: CoreFormsCaptcha,
  components: {'VueRecaptcha': VueRecaptcha},
  inject: {
    recaptchaSitekey: {required: true, type: String}
  },
  mounted() {
    this._isCaptchaReady = false
  },
  methods: {

    /* overwrite default methods  */

    execute() {
      this._solved = false
      if (this.$refs.recaptcha && this.recaptchaSitekey != null) {
        this.onValidationStarted()
        this.$refs.recaptcha.execute()
      } else {
        this.onRecaptchaError({error: 'missing site key'})
      }
    },

    reset() {
      this.onRecaptchaExpired()
    },

    /* recaptcha callbacks, fall back to base/super methods to handle the various flags */

    onRecaptchaVerify(s) {
      this.onValidationSuccess(s)
    },
    onRecaptchaError(e) {
      this.onValidationFailure(e)
    },
    onRecaptchaRendered() {
      this.onValidationReady()
    },
    onRecaptchaExpired() {
      if (this.$refs.recaptcha) {
        this.$refs.recaptcha.reset()
      }
    }
  }
}
</script>
