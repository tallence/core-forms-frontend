import SummaryBaseField from "./SummaryBaseField"

export default {
  extends: SummaryBaseField,
  computed: {
    displayValue() {
      return this.hasValue ? this.field.value.name || null : null
    },
    isDisplayed() {
      return this.displayValue != null
    },
    hasValue() {
      //in this case an object gets stored
      return this.field.value != null && typeof this.field.value === 'object'
    }
  }
}
