<template>
    <form-element-wrapper :validation-rules="validatorRules"
                          :field="field"
                          :hide-main-label="field.options.length === 1"
                          :parent-class="'core-forms__box ' + field.options.length > 1 ? 'core-forms__box-multi' : 'core-forms__box-single'">
        <template slot-scope="props">
            <div class="core-forms__box-inner">
                <radio-button v-for="(option, index) in field.options"
                              :key="field.id + '_' + index"
                              v-model="field.value"
                              :field-id="field.id + '_' + index"
                              :field-name="field.technicalName"
                              :option-label="option.name"
                              :option-value="option.id"
                              :required="field.validator.mandatory"
                              :show-asterisk="field.options.length === 1 && field.validator.mandatory"
                              :css-classes="props.validator.classes"/>
            </div>
        </template>
    </form-element-wrapper>
</template>

<script>
    import RadioButton from '../components/RadioButton';
    import FormElementValidationMixin from "../mixins/FormElementValidationMixin";

    export default {
        mixins: [FormElementValidationMixin],
        components: {
            'radio-button': RadioButton
        },
        beforeMount() {
            if (this.field.value == null) {
              const defaultOptions = this.field.options.filter(o => o['selectedByDefault']);
              this.field.value = (defaultOptions.length) ? defaultOptions[0]['id'] : null;
            }
            this.addRequiredValidationRule();
        }
    }
</script>
