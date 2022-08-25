<template>
  <vee-observer v-slot="{ handleSubmit, errors }"
                ref="observer"
                slim>

    <form @submit.prevent="handleSubmit(validate)"
          ref="form"
          novalidate
          autocomplete="on">

      <div class="core-forms__wizard">
        <div class="core-forms__wizard--head" v-if="formPages.length > 1">

          <button class="core-forms__wizard--head-step" type="button"
                  v-for="(formPage, pageIndex) in formPages"
                  :key="formPage.id"
                  @click="goToFormPage(pageIndex)"
                  :disabled="pageIndex >= activePageIndex">
            {{formPage.title}}
          </button>

        </div>

        <!-- Page content gets placed here -->
        <slot/>

        <form-error-wrapper :errors="errorMessage != null ? {global: [errorMessage]} : null"
                            :can-dismiss="true"
                            @onDismiss="errorMessage = null"></form-error-wrapper>

        <form-error-wrapper v-validation-error-summary-visible
                            :can-dismiss="false"
                            :errors="hasFieldErrorMessages(errors) ? errors : null"></form-error-wrapper>

        <div class="core-forms__wizard--footer">

          <div class="row">
            <div class="col-xs-12 col-md-6" >

              <!-- recaptcha is only required on the last page -->
              <vue-recaptcha v-if="recaptchaKey && !hasNextFormPage"
                             :sitekey="recaptchaKey"
                             ref="recaptcha"
                             size="invisible"
                             @verify="finalizeSubmit"
                             @expired="onCaptchaExpired"
                             :loadRecaptchaScript="true">
              </vue-recaptcha>

              <button type="button"
                      v-if="formPages.length > 1"
                      :disabled="!hasPrevFormPage || isFormSubmitting"
                      class="btn btn-secondary btn-lg core-forms__prev">
                {{  'prevPageButton'|formsMessage }}
              </button>

              <button type="submit"
                      :disabled="isFormSubmitting"
                      class="btn btn-primary btn-lg core-forms__submit">
                {{ (hasNextFormPage ? 'nextPageButton' : 'submitButton')|formsMessage }}
              </button>
            </div>

            <div class="col-xs-12 col-md-6 text-right">
              <div class="core-forms__required-hint required-asterisk"
                   :class="{'form-has-errors': hasFieldErrorMessages(errors) }">
                {{ 'inputMandatory'|formsMessage }}
              </div>
            </div>

          </div>

        </div>
      </div>
    </form>
  </vee-observer>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {CoreFormsEvents, CoreFormsEventSender} from "./index";

export default {
  name: 'FormWizard',
  replace: true,
  // made available during app initialization via provide() { ... }
  inject: ['recaptchaKey'],
  computed: {
    ...mapGetters('coreForms', ['activePageIndex', 'formPages', 'isFormSubmitting', 'hasNextFormPage', 'hasPrevFormPage']),
  },
  data() {
    return {
      errorMessage: null
    }
  },
  methods: {

    hasFieldErrorMessages(errors) {
      return Object.values(errors).filter(f => f.length !== 0).length;
    },
    onCaptchaExpired() {
      if (this.$refs.recaptcha) {
        this.$refs.recaptcha.reset();
      }
    },
    resetValidation() {
      if (this.$refs.observer) this.$refs.observer.reset();
    },
    validate() {
      this.$refs.observer.validate();
      if (this.$refs.recaptcha) {
        this.$refs.recaptcha.execute();
      } else {
        //skip recaptcha if no sitekey is present
        this.navigateToNextPage();
      }
    },

    finalizeSubmit() {
      this.$emit('submit', new FormData(this.$refs.form));
      CoreFormsEventSender.send(CoreFormsEvents.WIZARD_COMPLETED);
    },
    onSubmitError() {
      if (error == null || (error['globalError'] == null && error['fieldErrors'] == null)) {
        this.errorMessage = this.getFormsMessage('errorGlobal')
      } else {
        this.errorMessage = error['globalError'] || null;
        this.$refs.observer.setErrors(error['fieldErrors'] || {});
      }
      this.onCaptchaExpired();
    },

    /************************************ WIZARD *******************************/

    ...mapActions('coreForms', ['goToPreviousFormPage', 'goToNextFormPage', 'goToFormPage']),
    navigateToPage(pageIndex) {
      //can not navigate to pages in front, only backwards
      if (pageIndex > 0 && pageIndex < this.activePageIndex) {
        this.goToFormPage(pageIndex);
      }
    },
    navigateToPreviousPage() {
      if (this.hasPrevFormPage) {
        this.goToPreviousFormPage();
      }
    },
    navigateToNextPage() {
      if (this.hasNextFormPage) {
        //get form values -> store
        //select next page
        this.goToNextFormPage();
      } else {
        this.finalizeSubmit();
      }
    }

  },
  mounted() {
    CoreFormsEventSender.send(CoreFormsEvents.WIZARD_STARTED);
  }
}
</script>
