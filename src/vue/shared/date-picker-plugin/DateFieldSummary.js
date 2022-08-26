import SummaryBaseField from "../../plugins/core-forms/summary-fields/SummaryBaseField";
import {DateTime} from "luxon";

export default {
  extends: SummaryBaseField,
  computed: {
    displayValue() {
      let date = DateTime.fromISO(this.field.value);
      return date.toLocaleString(DateTime.DATE_MED)
    },
  }
}
