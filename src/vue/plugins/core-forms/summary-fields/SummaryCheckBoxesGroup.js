import SummaryBaseField from "./SummaryBaseField"

export default {
  extends: SummaryBaseField,
  computed: {
    displayValue() {
      const selectedOptions = this.field.options.filter(o => this.field.value.indexOf(o['id'] !== -1));
      return selectedOptions.length ? selectedOptions.map(o => o['name']).join(', ') : null;
    }
  }
}
