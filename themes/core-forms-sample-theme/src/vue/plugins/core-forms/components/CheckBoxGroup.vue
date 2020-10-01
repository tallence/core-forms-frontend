<template>
  <div>
    <check-box v-for="(option, index) in options"
               :key="name + '_' + index"
               v-model="checkBoxData[option.id]"
               :field-id="name + '_' + index"
               :field-name="name"
               @input="handleValueChange(option.id, $event)"
               :option-value="option.id"
               :option-label="option.name"
               :css-classes="cssClasses"
               :required="required"
               :show-asterisk="required && options.length === 1"
    />
  </div>
</template>

<script>
  import CheckBox from './CheckBox';
  import {arrayUnion, arrayWithout} from '../common/util'

  /**
   * this is required because the vee validator provider only tracks one v-model.
   * in this case different v-models are required.
   * so we are just wrapping multiple models into 1 single model object.
   */
  export default {
    replace: true,
    components: {'check-box': CheckBox},
    props: ['value', 'options', 'name', 'cssClasses', 'required'],
    computed: {
      checkBoxData: {
        get() {
          let obj = {};
          this.options.forEach(o => {
            obj[o.id] = this.value.indexOf(o.id) !== -1
          });
          return obj
        }
      }
    },
    methods: {
      handleValueChange(option, isSelected) {
        this.$emit('input', isSelected ? arrayUnion(this.value, [option]) : arrayWithout(this.value, option));
      }
    }
  }
</script>
