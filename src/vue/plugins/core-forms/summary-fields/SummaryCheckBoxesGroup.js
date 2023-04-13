import SummaryBaseField from "./SummaryBaseField"

export default {
  extends: SummaryBaseField,
  computed: {
    displayValue() {
      const selectedOptions = this.formField.options.filter(o => this.formField.value.indexOf(o['id']) !== -1)
      return selectedOptions.length ? selectedOptions.map(o => o['name']).join(', ') : null
    },
    labelValue() {
      //when a single checkbox is used, it is printed without an actual describing label in the form itself. do not show here as well (inconsistent)
      return (this.formField.options.length === 1) ? '' : this.formField.name
    }
  }
}
