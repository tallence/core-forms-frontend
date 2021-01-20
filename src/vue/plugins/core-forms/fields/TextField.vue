<template>
    <form-element-wrapper :validation-rules="validatorRules"
                          :field="field">
        <input class="form-control"
               type="text"
               :aria-placeholder="field.placeholder"
               :placeholder="field.placeholder"
               :name="field.technicalName"
               v-model.trim="field.value"
               :id="field.id"
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
