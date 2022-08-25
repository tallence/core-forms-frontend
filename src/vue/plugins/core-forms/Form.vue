<template>
  <transition name="core-forms__app__transition-fade" appear mode="out-in">

    <!-- ################################################### LOADING STATE INITIAL-->
    <form-load-spinner v-if="isFormLoading" :inline-mode="true"/>

    <!-- ################################################### REGULAR STATE-->
    <div v-if="!isFormLoading">

      <!-- ################################################### SUBMIT STATE-->
      <form-load-spinner v-if="isFormSubmitting"
                         :inline-mode="false"
                         :display-progress="hasFileUploads">
        {{ 'submitActive'|formsMessage }}
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
          <div class="row row-equal">
            <div v-for="field in formPage.formElements"
                 :key="field.id"
                 :class="field.advancedSettings|columnClass">
              <transition name="core-forms__app__transition-fade" mode="out-in">
                <component v-if="isFieldSupported(field.type)"
                           :is="field.type"
                           :field="field"
                           :data-field-type="field.type"/>
              </transition>
            </div>
          </div>
        </form-wizard-step>
      </form-wizard>

    </div>
  </transition>

</template>

<script>
import {mapGetters} from "vuex";
import {CoreFormsEvents, CoreFormsEventSender, CoreFormsUtils} from "./index";
import FormWizard from "./FormWizard";
import FormWizardStep from "./FormWizardStep";

export default {
  name: 'FormPage',
  components: {FormWizardStep, FormWizard},
  replace: true,

  // made available during app initialization via provide() { ... }
  inject: ['formUrl'],

  computed: {
    ...mapGetters('coreForms', ['isFormLoading', 'isFormSubmitting', 'formValues', 'formPages', 'allFormFields']),
    formIntroText() {
      return this.$store.getters['coreForms/getFormProperty']("introText");
    },
    hasFileUploads() {
      return this.allFormFields && this.allFormFields.filter(e => e.type === 'FileUpload' && e.value != null).length;
    }
  },
  methods: {
    isFieldSupported(type) {
      return CoreFormsUtils.isFormFieldTypeSupported(type)
    },
    async onLoadForm() {
      try {
        console.log('load form')
        await this.$store.dispatch('coreForms/loadForm', this.formUrl);
        this.$nextTick(() => {

        })
      } catch (err) {
        this.$emit('onFormError', err);
      }
    },
    async onSubmitForm(dataToSubmit) {
      try {
        let result = await this.$store.dispatch('coreForms/submitForm', dataToSubmit);
        if (result) {
          this.$addFormsMessage({
            successPageTitle: result['textHeader'],
            successPageText: result['textMessage'],
            successPageButton: result['textButton']
          });
        }
        this.$emit('onFormSuccess');
      } catch (error) {
        this.$refs.wizard.onSubmitError(error);
      }
    }
  },

  mounted() {
    CoreFormsEventSender.init(this.$root);
    CoreFormsEventSender.send(CoreFormsEvents.APPLICATION_LOADED);
    this.onLoadForm();
  }
}
</script>
