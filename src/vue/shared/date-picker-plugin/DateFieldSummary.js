import SummaryBaseField from "../../plugins/core-forms/summary-fields/SummaryBaseField"
import {DateTime} from "luxon"
import {formatDate} from "./imports";

export default {
  extends: SummaryBaseField,
  computed: {
    displayValue() {
      return formatDate(this.field.value, DateTime.DATE_MED)
    },
  }
}
