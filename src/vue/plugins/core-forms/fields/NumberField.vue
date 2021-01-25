<template>
    <form-element-wrapper :validation-rules="validatorRules"
                          :field="field">
        <input class="form-control"
               type="number"
               :name="field.technicalName"
               :id="field.id"
               v-model.trim="field.value"
               :min="field.validator.minSize"
               :max="field.validator.maxSize"
               :aria-placeholder="field.placeholder"
               :placeholder="field.placeholder"
               :required="field.validator.mandatory"/>
    </form-element-wrapper>
</template>

<script>
    import FormElementValidationMixin from "../mixins/FormElementValidationMixin";

    export default {
        mixins: [FormElementValidationMixin],
        beforeMount() {
            this.addNumberBasedValidationRules();
        }
    }
</script>
