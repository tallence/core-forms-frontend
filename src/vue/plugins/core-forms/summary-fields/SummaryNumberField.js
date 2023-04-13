import SummaryBaseField from "./SummaryBaseField"

export default {
  extends: SummaryBaseField,
  computed: {
    hasValue() {
      return this.formField.value != null
    }
  }
}
