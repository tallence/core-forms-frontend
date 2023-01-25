<template>
    <form-element-wrapper :validation-rules="validatorRules"
                          :field="field"
                          :hide-main-label="field.options.length === 1"
                          :parent-class="'core-forms__box ' + field.options.length > 1 ? 'core-forms__box-multi' : 'core-forms__box-single'">
        <template slot-scope="props">
            <div class="core-forms__box-inner">
                <check-box-group :options="field.options"
                                 v-model="field.value"
                                 :name="field.technicalName"
                                 :required="field.validator.mandatory"
                                 :css-classes="props.validator.classes"/>
            </div>
        </template>
    </form-element-wrapper>
</template>

<script>
    import CheckBoxGroup from '../components/CheckBoxGroup';
    import FormElementValidationMixin from "../mixins/FormElementValidationMixin";

    export default {
        mixins: [FormElementValidationMixin],
        components: {
            'check-box-group': CheckBoxGroup
        },
        beforeMount() {
            this.field.value = this.field.value || [];
            if (this.field.value == null || this.field.value.length === 0) {
              this.field.value = this.field.options.filter(o => o['selectedByDefault']).map(o => o.id);
            }
            this.addArrayBasedValidationRules();
        }
    }
</script>
