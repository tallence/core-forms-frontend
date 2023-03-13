<template>
  <!-- ################################################### LOADING STATE INITIAL-->
  <form-load-spinner v-if="isFormLoading" :inline-mode="true"/>

  <!-- ################################################### REGULAR STATE-->
  <div v-if="!isFormLoading">

    <!-- ################################################### SUBMIT STATE-->
    <form-load-spinner v-if="isFormSubmitting"
                       :inline-mode="false"
                       :display-progress="hasFileUploads">
      {{ $translateMessage('submitActive') }}
    </form-load-spinner>

    <div class="form-group form-group-text core-forms__intro cm-details__text cm-richtext"
         v-if="formIntroText"
         v-html="formIntroText">
    </div>

    <form-wizard ref="wizard"
                 @submit="onSubmitForm">
      <form-wizard-step v-for="(formPage, pageIndex) in formPages"
                        :key="formPage.id"
                        :page-index="pageIndex">

        <form-summary v-if="formPage.isSummaryPage" :form-page="formPage"></form-summary>
        <form-fields v-if="formPage.formElements" :form-page="formPage"></form-fields>
      </form-wizard-step>
    </form-wizard>

  </div>

</template>

<script>
import {mapState, mapActions} from 'pinia'
import {CoreFormsEvents, CoreFormsEventSender} from "./index"
import {useCoreFormsStore} from './common/store'

export default {
  name: 'Form',
  replace: true,
  emits: ['onFormError', 'onFormSuccess'],
  inject: {
    formUrl: {
      default: null
    }
  },

  computed: {
    ...mapState(useCoreFormsStore, ['isFormLoading', 'isFormSubmitting', 'formValues', 'formPages', 'allFormFields', 'formProperty']),
    formIntroText() {
      return this.formProperty("introText")
    },
    hasFileUploads() {
      return this.allFormFields && this.allFormFields.filter(e => e.type === 'FileUpload' && e.value != null).length
    }
  },
  methods: {
    ...mapActions(useCoreFormsStore, ['loadForm', 'submitForm']),
    async onLoadForm() {
      try {
        await this.loadForm(this.formUrl)
        await this.$nextTick(() => {
          //if (this.$refs.observer) this.$refs.observer.reset();
        })
      } catch (err) {
        this.$emit('onFormError', err)
      }
    },
    async onSubmitForm() {
      try {
        let result = await this.submitForm()
        if (result) {
          this.$addTranslation({
            successPageTitle: result['textHeader'],
            successPageText: result['textMessage'],
            successPageButton: result['textButton']
          })
        }
        this.$emit('onFormSuccess')
      } catch (error) {
        this.$refs.wizard.onSubmitError(error)
      }
    }
  },

  mounted() {
    CoreFormsEventSender.send(CoreFormsEvents.APPLICATION_LOADED)
    this.onLoadForm()
  }
}
</script>
