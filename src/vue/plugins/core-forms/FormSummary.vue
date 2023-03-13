<template>
  <div class="core-forms__wizard--summary">
    <ul class="list-group">
      <li class="list-group-item" v-for="(formPage, pageIndex) in previousFormPages" :key="formPage.id">
        <h5 class="mb-1" v-if="previousFormPages.length > 1">{{ formPage.title || (pageIndex + 1) }}</h5>
        <component v-for="field in formPage.formElements"
                   :key="field.id"
                   :is="getSummaryFieldType(field.type)"
                   :form-field="field"/>
      </li>
    </ul>
  </div>
</template>

<script>


import {useCoreFormsStore} from './common/store'
import {CoreFormsConstants} from './common/util'
import {mapState} from 'pinia'
import {capitalize} from 'vue'

export default {
  name: 'FormSummary',
  replace: true,
  props: ['formPage'],
  computed: {
    ...mapState(useCoreFormsStore, ['previousFormPages'])
  },
  methods: {
    getSummaryFieldType(fieldType) {
      const summaryFieldName = CoreFormsConstants.SUMMARY_PREFIX + capitalize(fieldType || 'BaseField');
      let result = this.$isFieldSupported(summaryFieldName, false) ? summaryFieldName :  'SummaryBaseField'
      console.log('summary field for ' + fieldType, result);
      return result;
    }
  }
}
</script>
