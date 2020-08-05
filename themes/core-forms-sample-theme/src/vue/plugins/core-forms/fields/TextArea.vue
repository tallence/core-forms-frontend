<template>
    <form-element-wrapper :validation-rules="validatorRules"
                          :field="field">
        <textarea class="form-control"
                  type="text"
                  :id="field.id"
                  :name="field.technicalName"
                  :rows="field.rows"
                  :aria-placeholder="field.placeholder"
                  :placeholder="field.placeholder"
                  v-model.trim="field.value"
                  ref="textarea"
                  :required="field.validator.mandatory"/>
    </form-element-wrapper>
</template>

<script>
    import FormElementValidationMixin from "../mixins/FormElementValidationMixin";

    export default {
        mixins: [FormElementValidationMixin],
        beforeMount() {
            this.addStringBasedValidationRules();
        }
    }
</script>
