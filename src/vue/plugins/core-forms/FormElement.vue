<template>
  <vee-provider ref="provider"
                v-if="isRendered"
                :name="field.technicalName"
                :rules="validationRules"
                v-slot="{ valid, invalid, required, validated, classes, errors }"
                debounce="200"
                slim>

    <div class="form-group core-forms__field"
         :class="containerCssClasses(classes)">

      <label v-if="!hideMainLabel"
             class="core-forms__field-label"
             :class="[{'required-asterisk': field.validator.mandatory }, labelClass]"
             :for="field.id">
        {{field.name}}
      </label>

      <slot :validator="{valid, classes, invalid, validated}">
        <!-- form field markup will be placed here -->
      </slot>

      <form-element-hint v-if="field.hint && !hideHint" :text="field.hint"/>

      <div class="invalid-feedback" v-validation-single-error-visible>
        {{errors[0]}}
      </div>
    </div>
  </vee-provider>
</template>

<script>
  import {isFormFieldTypeSupported} from "./common/util";

  export default {
    props: {
      'form': {type: String, required: true},
      'field': {type: Object, required: true},
      'validationRules': {type: Object, required: true},
      'hideMainLabel': {required: false, default: false},
      'hideHint': {required: false, default: false},
      'parentClass': {required: false, default: null, type: String},
      'labelClass': {required: false, default: null, type: String}
    },

    computed: {
      isRendered() {
        if (!this.field || !isFormFieldTypeSupported(this.field.type)) {
          return false;
        }
        let advanced = this.field.advancedSettings;
        if (advanced && advanced.visibility && advanced.visibility.activated === true) {
          let relatedFieldValue = this.$store.getters["coreForms/getFormValue"](advanced.visibility.elementId);
          let targetValue = advanced.visibility.value;
          return Array.isArray(relatedFieldValue) ? relatedFieldValue.indexOf(targetValue) !== -1 : relatedFieldValue === targetValue;
        }
        return true;
      }
    },
    methods: {
      /**
       * merge validation classes with default css classes for form elements
       *
       * @param classesObject
       * @returns {Object}
       */
      containerCssClasses(classesObject) {
        let validationClasses = classesObject || {};
        if (this.$refs.provider != null) {
          validationClasses = this.$refs.provider.classes
        }
        let containerClasses = {
          'core-forms__field-with-hint': this.field.hint && !this.hideHint
        };
        containerClasses[`core-forms__field-${this.field.type.toLowerCase()}`] = true;
        return {...containerClasses, ...validationClasses};
      },
      resetValidation() {
        if (this.$refs.provider) {
          this.$refs.provider.reset();
        }
      }
    },
    watch: {
      'field.value': function (newVal, oldVal) {
        /*
        when the value of a field changes, run the validation and store the valid or empty value in Vuex store.
        other form fields might have dependencies to this value (is shown or not?), can be easily accessed via Vuex store getters.
        */
        if (newVal != null && newVal !== oldVal) {
          this.$refs.provider.validate().then(async (ValidationResult) => {
            if (ValidationResult.valid || newVal === "" || newVal === []) {
              await this.$store.dispatch('coreForms/setFormValue', {
                field: this.field.id,
                value: newVal
              });
            }
          });
        }
      }
    },
    async mounted() {
      await this.$store.dispatch('coreForms/setFormValue', {
        field: this.field.id,
        value: this.field.value
      });
    }
  }
</script>

