<template>
  <div class="form-check custom-control custom-checkbox" :class="cssClasses">
    <input type="checkbox"
           class="form-check-input custom-control-input"
           :name="fieldName"
           :checked="value"
           :value="optionValue"
           @change="handleValueChange"
           :id="fieldId"
           :required="required"/>
    <label class="form-check-label custom-control-label"
           :for="fieldId">
      <span class="core-forms__field-inner-label" :class="{'required-asterisk': showAsterisk}" v-html="optionLabel"/>
    </label>
  </div>
</template>

<script>
  export default {
    replace: true,
    props: ['fieldName', 'fieldId', 'value', 'optionLabel', 'optionValue', 'required', 'cssClasses', 'showAsterisk'],
    methods: {
      handleValueChange(event) {
        this.$emit('input', event.target.checked);
      }
    }
  }
</script>
