<template>
  <div class="row row-equal">
    <div v-for="field in formPage.formElements"
         :key="field.id"
         :class="[$columnCssClass(field.advancedSettings)]">
      <component v-if="$isFieldSupported(field.type)"
                 :is="field.type"
                 :field="field"
                 :data-field-type="field.type"/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  formPage: Object
})
</script>
