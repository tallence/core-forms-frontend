<template>
  <vee-field ref="veeField"
             v-if="isRendered"
             :name="formField.technicalName"
             :rules="validationRules"
             v-model="formField.value"
             v-slot="{ field, meta, errors }"
             debounce="150"
             slim>

    <div :class="[$fieldCssClass(formField, hideHint), $validationCssClass(meta)]">

      <label v-if="!hideMainLabel"
             class="core-forms__field-label"
             :class="[{'required-asterisk': formField.validator.mandatory }, labelClass]"
             :for="formField.id">
        {{ formField.name }}
      </label>

      <slot :validator="{ meta, classes: [$validationCssClass(meta)] }"></slot>

      <slot name="secondary"></slot>

      <form-element-hint v-if="formField.hint && !hideHint" :text="formField.hint"/>

      <div class="invalid-feedback" v-validation-single-error-visible>
        {{ errors.join(", ") }}
      </div>
    </div>
  </vee-field>
</template>

<script>
import {useCoreFormsStore} from '../common/store'
import FormElementVisibilityMixin from '../mixins/FormElementVisibilityMixin'
import {mapActions} from 'pinia'

export default {
  mixins: [FormElementVisibilityMixin],
  props: {
    'validationRules': {type: Object, required: true},
    'hideMainLabel': {required: false, default: false},
    'hideHint': {required: false, default: false},
    'parentClass': {required: false, default: null, type: String},
    'labelClass': {required: false, default: null, type: String}
  },
  methods: {
    ...mapActions(useCoreFormsStore, ['setFormFieldValue']),
    revalidate() {
      return this.$refs.veeField?.validate()
    },
    resetValidation() {
      this.$refs.veeField?.reset()
    }
  },
  watch: {
    'formField.value': {
      deep: true,
      handler: function (newVal, oldVal) {
        if (newVal != null && newVal !== oldVal) {
          this.$nextTick(() => {
            this.$refs.veeField?.validate().then((ValidationResult) => {
              if (ValidationResult.valid || newVal === "") {
                this.setFormFieldValue(this.formField.id, newVal)
              }
            })
          })
        }
      }
    }
  },
  async mounted() {
    this.setFormFieldValue(this.formField.id, this.formField.value)
  }
}
</script>

