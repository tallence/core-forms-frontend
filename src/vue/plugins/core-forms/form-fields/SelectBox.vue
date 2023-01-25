<template>
    <form-element-wrapper :validation-rules="validatorRules"
                          :field="field">

        <select class="custom-select"
                :name="field.technicalName"
                :id="field.technicalName"
                v-model="field.value"
                :required="field.validator.mandatory">

            <option :value="null">{{'inputOptionDefault'|formsMessage}}</option>
            <option v-for="(option, index) in field.options"
                    :key="index"
                    :value="option['id']">
                {{option['name'] }}
            </option>
        </select>

    </form-element-wrapper>
</template>

<script>
    import FormElementValidationMixin from "../mixins/FormElementValidationMixin";

    export default {
        mixins: [FormElementValidationMixin],
        beforeMount() {
            if (this.field.value == null) {
              const defaultOptions = this.field.options.filter(o => o['selectedByDefault']);
              this.field.value = (defaultOptions.length) ? defaultOptions[0]['id'] : null;
            }
            this.addRequiredValidationRule();

        }
    }
</script>

