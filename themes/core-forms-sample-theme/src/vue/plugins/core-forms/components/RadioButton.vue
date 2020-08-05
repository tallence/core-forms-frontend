<template>
  <div class="form-check custom-control custom-radio" :class="cssClasses">
    <input type="radio"
           class="form-check-input custom-control-input"
           :name="fieldName"
           :value="optionValue"
           v-model="radioButtonValue"
           :id="fieldId"
           :required="required"/>
    <label class="form-check-label custom-control-label"
           :for="fieldId">
      <span class="core-forms__field-inner-label" :class="{'required-asterisk': showAsterisk }" v-html="optionLabel"/>
    </label>
  </div>
</template>

<script>
  export default {
    replace: true,
    props: ['fieldName', 'fieldId', 'value', 'optionValue', 'optionLabel', 'required', 'cssClasses', 'showAsterisk'],
    computed: {
      radioButtonValue: {
        get() {
          return this.value
        },
        set() {
          this.$emit("input", this.optionValue)
        }
      }
    }
  }
</script>
