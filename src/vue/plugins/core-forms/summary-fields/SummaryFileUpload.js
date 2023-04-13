import SummaryBaseField from "./SummaryBaseField"

export default {
  extends: SummaryBaseField,
  computed: {
    displayValue() {
      return this.hasValue ? this.formField.value.name || null : null
    },
    isDisplayed() {
      return this.displayValue != null
    },
    hasValue() {
      //in this case an object gets stored
      return this.formField.value != null && typeof this.formField.value === 'object'
    }
  }
}
