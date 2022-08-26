import SummaryBaseField from "./SummaryBaseField"

export default {
  extends: SummaryBaseField,
  computed: {
    displayValue() {
      let selectedOption = this.field.options.find(o => o['id'] === this.field.value);
      return selectedOption != null ? selectedOption['name'] : null
    }
  }
}
