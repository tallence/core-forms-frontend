<template>
  <div class="core-forms__wizard--step">
    <div v-if="isPageDisplayed">

      <div class="form-group form-group-text core-forms__wizard--step-desc  cm-details__text cm-richtext"
           v-if="activePageData.description"
           v-html="activePageData.description">
      </div>

      <!-- Step content gets placed here -->
      <slot/>

    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex"

export default {
  name: 'FormWizardStep',
  replace: true,
  props: ['pageIndex'],
  computed: {
    ...mapGetters('coreForms', ['activePageIndex', 'activePageData']),
    isPageDisplayed() {
      return this.pageIndex === this.activePageIndex
    }
  }
}
</script>
