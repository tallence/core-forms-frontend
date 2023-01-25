<template>
  <dl class="row" v-if="isRendered && isDisplayed">
    <dt class="col-sm-3" :class="{'required-asterisk': isRequired && hasLabelValue }">{{ labelValue }}</dt>
    <dd class="col-sm-9" :class="{'required-asterisk': isRequired && !hasLabelValue && hasValue }">{{ displayValue }}</dd>
  </dl>
</template>

<script>
import FormElementVisibilityMixin from "../mixins/FormElementVisibilityMixin"

export default {
  name: 'SummaryBaseField',
  mixins: [FormElementVisibilityMixin],
  props: ['field'],
  computed: {
    isRequired() {
      return this.field.validator.mandatory;
    },
    isDisplayed() {
      return this.hasValue && this.displayValue != null
    },
    labelValue() {
      return this.field.name
    },
    displayValue() {
      return this.field.value
    },
    hasLabelValue() {
      return this.labelValue != null && this.labelValue.length;
    },
    hasValue() {
      return this.field.value != null && this.field.value.length
    }
  }
}
</script>
