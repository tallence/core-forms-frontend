<template>
  <form-element :form-field="field"
                :validation-rules="validatorRules"
                :hide-main-label="true"
                :hide-hint="true"
                parent-class="core-forms__box core-forms__box-single">
    <template v-slot="props">
      <div class="core-forms__box-inner">
        <check-box :field-id="field.id"
                   :field-name="field.technicalName"
                   v-model="field.value"
                   :required="field.validator.mandatory"
                   :show-asterisk="field.validator.mandatory"
                   :option-label="checkBoxText"
                   :option-value="'on'"
                   :css-classes="props.validator.classes"/>
      </div>
    </template>
  </form-element>
</template>

<script>
import CheckBox from '../components/CheckBox'
import FormElementValidationMixin from "../mixins/FormElementValidationMixin"

export default {
  mixins: [FormElementValidationMixin],
  components: {
    'check-box': CheckBox
  },
  beforeMount() {
    this.field.value = this.field.value != null ? this.field.value : false
    this.addCheckboxRequiredValidationRule()
  },
  computed: {
    checkBoxText() {
      if (this.field.linkTarget != null && this.field.linkTarget.length) {
        let exp = /(.*)%([^%]+)%(.*)/i
        return this.field.hint.replace(exp, `$1<a target="_blank" href="${this.field.linkTarget}">$2</a>$3`).replace('*', '')
      }
      return this.field.hint
    }
  }
}
</script>
