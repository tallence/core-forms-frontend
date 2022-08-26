<template>
  <dl class="row" v-if="isRendered && isDisplayed">
    <dt class="col-sm-3">{{ labelValue }}</dt>
    <dd class="col-sm-9">{{ displayValue }}</dd>
  </dl>
</template>

<script>
import FormElementVisibilityMixin from "../mixins/FormElementVisibilityMixin"

export default {
  name: 'SummaryBaseField',
  mixins: [FormElementVisibilityMixin],
  props: ['field'],
  computed: {
    isDisplayed() {
      return this.hasValue && this.displayValue != null
    },
    labelValue() {
      return this.field.name
    },
    displayValue() {
      return this.field.value
    },
    hasValue() {
      return this.field.value != null && this.field.value.length
    }
  }
}
</script>
