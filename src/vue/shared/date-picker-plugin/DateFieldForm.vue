<template>
  <form-element-wrapper :validation-rules="validatorRules"
                        ref="formElement"
                        :field="field">

    <vue-datetime-picker type="date"
                         v-model="field.value"
                         :bootstrap-styling="true"
                         :input-id="field.id"
                         :input-class="'form-control'"
                         :hidden-name="field.technicalName"
                         :min-datetime="field.validator.minDate"
                         :max-datetime="field.validator.maxDate"
                         :data-day="selectedDay"
                         :data-month="selectedMonth"
                         :data-year="selectedYear"
                         :placeholder="field.placeholder"
                         :auto="true"
                         class="core-forms"
                         :title="field.name"/>
  </form-element-wrapper>
</template>

<script>
import {DatePickerPluginConstants, formatDate} from "./imports";
import FormElementValidationMixin from "../../plugins/core-forms/mixins/FormElementValidationMixin";
import SummaryBaseField from "../../plugins/core-forms/summary-fields/SummaryBaseField";

export default {
  mixins: [FormElementValidationMixin],
  beforeMount() {
    this.addRequiredValidationRule()
    if (this.field.validator.minDate) {
      this.addValidationRule('minDate', DatePickerPluginConstants.VALIDATION_RULE_MIN, {date: this.field.validator.minDate})
    }
    if (this.field.validator.maxDate) {
      this.addValidationRule('maxDate', DatePickerPluginConstants.VALIDATION_RULE_MAX, {date: this.field.validator.maxDate})
    }
  },
  mounted() {
    this.$nextTick(() => {
      //datepicker fires initial input event -> triggers the validation, not wanted at the initial startup
      this.$refs.formElement.resetValidation()
    })
  },
  computed: {
    selectedDay() {
      return formatDate(this.field.value, 'd')
    },
    selectedMonth() {
      return formatDate(this.field.value, 'L')
    },
    selectedYear() {
      return formatDate(this.field.value, 'yyyy')
    }
  }
}
</script>
