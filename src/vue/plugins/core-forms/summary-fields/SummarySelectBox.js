import SummaryBaseField from "./SummaryBaseField"

export default {
  extends: SummaryBaseField,
  computed: {
    displayValue() {
      let selectedOption = this.formField.options.find(o => o['id'] === this.formField.value)
      return selectedOption != null ? selectedOption['name'] : null
    }
  }
}
