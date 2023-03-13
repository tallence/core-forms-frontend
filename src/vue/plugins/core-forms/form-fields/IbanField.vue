<template>
  <form-element :validation-rules="validatorRules"
                :form-field="field">
    <input class="form-control"
           type="text"
           :aria-placeholder="field.placeholder"
           :placeholder="field.placeholder"
           :name="field.technicalName"
           v-model.trim="field.value"
           :id="field.id"
           :required="field.validator.mandatory"/>
  </form-element>
</template>

<script>
import FormElementValidationMixin from "../mixins/FormElementValidationMixin"
import {CoreFormsValidationRules} from "../../core-forms-validation"

export default {
  mixins: [FormElementValidationMixin],
  beforeMount() {
    this.addRequiredValidationRule()
    this.addValidationRule("iban", CoreFormsValidationRules.IBAN, true)
  }
}
</script>
