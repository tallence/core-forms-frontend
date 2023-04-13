<template>
  <form-element :validation-rules="validatorRules"
                ref="dateFieldElement"
                :form-field="field">
    <DatePicker v-model="_modelValue"
                ref="dateFieldPicker"
                :locale="locale"
                :minDate="field.validator.minDate"
                :maxDate="field.validator.maxDate"
                :startDate="field.validator.minDate"
                :format="outputFormatFn"
                :yearRange="_selectableYearRange"
                :enableTimePicker="false"
                :transitions="true"
                :autoApply="true"
                :hideOffsetDates="false"
                :inputClassName="'form-control'">
    </DatePicker>
    <input type="hidden" :name="field.technicalName" :value="field.value">
  </form-element>
</template>

<script>
import {DatePickerPluginConstants, formatDateForUser, formatDateToIso} from './imports'
import FormElementValidationMixin from '../../plugins/core-forms/mixins/FormElementValidationMixin'

export default {
  mixins: [FormElementValidationMixin],
  inject: ['datePickerLocale', 'maxYears'],
  computed: {
    _selectableYearRange() {
      let year = new Date().getFullYear()
      if (this.field?.validator?.minDate != null) {
        year = new Date(this.field.validator.minDate).getFullYear()
      }
      return [year, year + (this.maxYears || DatePickerPluginConstants.MAX_YEARS)]
    },
    _modelValue: {
      get: function () {
        return this.field.value
      },
      set: function (newValue) {
        this.field.value = formatDateToIso(newValue)
      }
    }
  },
  beforeMount() {
    this.addRequiredValidationRule()
    if (this.field.validator.minDate) {
      this.addValidationRule('minDate', DatePickerPluginConstants.VALIDATION_RULE_MIN, {date: this.field.validator.minDate})
    }
    if (this.field.validator.maxDate) {
      this.addValidationRule('maxDate', DatePickerPluginConstants.VALIDATION_RULE_MAX, {date: this.field.validator.maxDate})
    }
  },
  methods: {
    outputFormatFn(dateValue) {
      return formatDateForUser(dateValue, this.datePickerLocale)
    },
    reset() {
      this._modelValue = null
    },
    open() {
      this.$refs.dateFieldPicker?.openMenu()
    }
  }
}
</script>
