<script>
import {CoreFormsEvents, CoreFormsEventSender} from "../index";

export default {
  methods: {
    /* those methods should be overwritten */

    execute() {
      this.onValidationSkipped();
    },
    reset() {
      //do nothing
    },

    /* notifies the form about validation results */

    onValidationSkipped() {
      this.$emit('onValidated')
    },

    onValidationSuccess() {
      CoreFormsEventSender.send(CoreFormsEvents.SPAM_PROTECT_SUCCESS)
      this.$emit('onValidated')
    },

    onValidationFailure() {
      CoreFormsEventSender.send(CoreFormsEvents.SPAM_PROTECT_FAILED)
      this.$emit('onFailed')
    }
  }
}
</script>
