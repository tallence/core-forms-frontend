<template>
  <div class="core-forms__wizard--summary">
    <ul class="list-group">
      <li class="list-group-item" v-for="(formPage, pageIndex) in previousFormPages" :key="formPage.id">
        <h5 class="mb-1" v-if="previousFormPages.length > 1">{{ formPage.title || (pageIndex + 1) }}</h5>
        <component v-for="field in formPage.formElements"
                   :key="field.id"
                   :is="getSummaryFieldType(field.type)"
                   :field="field"/>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import {CoreFormsUtils} from "./index"

export default {
  name: 'FormSummary',
  replace: true,
  props: ['formPage'],
  computed: {
    ...mapGetters('coreForms', ['previousFormPages'])
  },
  methods: {
    getSummaryFieldType(fieldType) {
      let summaryField = 'SummaryBaseField'
      if (CoreFormsUtils.isFieldTypeSupported(this.$root, 'Summary' + fieldType, false)) {
        return 'Summary' + fieldType
      }
      return summaryField
    }
  }
}
</script>
