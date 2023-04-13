<script>

import {CoreFormsCaptchaConstants} from './index'

export default {
  emits: [
    'onCaptchaReady',
    'onCaptchaStarted',
    'onCaptchaCompleted',
    'onCaptchaFailed'
  ],
  data() {
    return {
      _isCaptchaReady: true,
      _isCaptchaActive: false,
      _isCaptchaSkipped: false,
      _isCaptchaSolved: true,
      _isCaptchaError: false,
      _captchaSolution: null
    }
  },
  methods: {

    /* those methods should be overwritten */

    execute() {
      this.onValidationSuccess()
    },

    reset() {
      //do nothing
      this._isCaptchaReady = true
      this._isCaptchaSolved = false
      this._isCaptchaError = false
      this._isCaptchaActive = false
      this._captchaSolution = null
    },

    /* base helper methods */

    isActive() {
      return this.isSkipped() || this._isCaptchaSolved
    },
    isSkipped() {
      return this._isCaptchaSkipped
    },
    isError() {
      return this._isCaptchaError
    },
    isReady() {
      return this._isCaptchaReady
    },
    isValid() {
      return this._isCaptchaSolved
    },
    getSolution() {
      return this._captchaSolution
    },

    onValidationReady() {
      this.$emit(CoreFormsCaptchaConstants.EVENTS.READY, null)
    },
    onValidationStarted() {
      this._isCaptchaActive = true
      this._isCaptchaSkipped = false
      this._isCaptchaSolved = false
      this._isCaptchaError = false
      this._captchaSolution = null
      this.$emit(CoreFormsCaptchaConstants.EVENTS.STARTED)
    },
    onValidationSuccess(solution) {
      this._isCaptchaActive = false
      this._isCaptchaSkipped = false
      this._isCaptchaSolved = true
      this._isCaptchaError = false
      this._captchaSolution = solution
      this.$emit(CoreFormsCaptchaConstants.EVENTS.COMPLETED, solution)
    },
    onValidationFailure(e) {
      this._isCaptchaActive = false
      this._isCaptchaSkipped = false
      this._isCaptchaSolved = false
      this._isCaptchaError = true
      this._captchaSolution = null
      this.$emit(CoreFormsCaptchaConstants.EVENTS.FAILED, e)
    }
  }
}
</script>
