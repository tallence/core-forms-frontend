<template>
  <div>
    <form-element-wrapper :validation-rules="validatorRules"
                          :field="field">
        <input class="form-control"
               type="email"
               :aria-placeholder="field.placeholder"
               :placeholder="field.placeholder"
               :name="field.technicalName"
               v-model.trim.lazy="field.value"
               v-debounce="inputDebounceDelay"
               :id="field.id"
               :required="field.validator.mandatory"/>
    </form-element-wrapper>

    <check-box v-if="field.displayCheckbox"
               css-classes="core-forms__field-copymail form-group"
               :field-id="field.id + '_sendCopy'"
               :field-name="field.technicalName + '_sendCopy'"
               v-model="field.copyValue"
               :required="false"
               :show-asterisk="false"
               :option-label="'inputCopyMail'|formsMessage"
               :option-value="'on'"/>
  </div>
</template>

<script>
    import FormElementValidationMixin from "../mixins/FormElementValidationMixin";
    import CheckBox from "../components/CheckBox";

    export default {
      components: {CheckBox},
      mixins: [FormElementValidationMixin],
        beforeMount() {
           this.addEmailBasedValidationRules();
        }
    }
</script>
