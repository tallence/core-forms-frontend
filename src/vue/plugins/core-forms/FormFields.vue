<template>
  <div class="row row-equal" >
    <div v-for="field in formPage.formElements"
         :key="field.id"
         :class="field.advancedSettings|columnClass">
      <transition name="core-forms__app__transition-fade" mode="out-in">
        <component v-if="isFormFieldSupported(field.type)"
                   :is="field.type"
                   :field="field"
                   :data-field-type="field.type"/>
      </transition>
    </div>
  </div>
</template>

<script>


import {CoreFormsUtils} from "./index"

export default {
  name: 'FormFields',
  replace: true,
  props: ['formPage'],
  methods: {
    isFormFieldSupported(type) {
      return CoreFormsUtils.isFieldTypeSupported(this.$root, type, true)
    }
  }
}
</script>
