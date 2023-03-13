import SummaryBaseField from '../../plugins/core-forms/summary-fields/SummaryBaseField'
import {formatDateForUser} from './imports'

export default {
  extends: SummaryBaseField,
  inject: ['datePickerLocale'],
  computed: {
    displayValue() {
      return formatDateForUser(this.formField.value != null ? new Date(this.formField.value) : null, this.datePickerLocale)
    }
  }
}
