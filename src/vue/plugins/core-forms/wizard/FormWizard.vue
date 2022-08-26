<template>
  <vee-observer v-slot="{ errors }"
                ref="observer"
                slim>

    <form @submit.prevent="validate"
          @validate
          ref="form"
          novalidate
          autocomplete="on">

      <div class="core-forms__wizard">
        <div class="core-forms__wizard--head" v-if="formPages.length > 1">

          <ul class="nav nav-tabs justify-content-center">
            <li class="nav-item"
                v-for="(formPage, pageIndex) in formPages"
                :key="formPage.id">
              <a class="nav-link"
                 :class="{
                  'active': pageIndex === activePageIndex,
                  'disabled': pageIndex >= activePageIndex
                 }"
                 aria-current="page"
                 :aria-disabled="(pageIndex >= activePageIndex)"
                 href="#"
                 @click="goToFormPage(pageIndex)">{{formPage.title || (pageIndex+1)}}</a>
            </li>
          </ul>
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
                      v-if="hasPrevFormPage"
                      :disabled="!hasPrevFormPage || isFormSubmitting"
                      @click="goToPreviousFormPage"
                      class="btn btn-text core-forms__prev">
                {{  'prevPageButton'|formsMessage }}
              </button>

              <button type="submit"
                      :disabled="isFormSubmitting"
                      class="btn btn-primary core-forms__submit">
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
import {CoreFormsEvents, CoreFormsEventSender} from "../index";
import {EventSender} from "../common/events";

export default {
  name: 'FormWizard',
  replace: true,
  // made available during app initialization via provide() { ... }
  inject: ['recaptchaKey'],
  computed: {
    ...mapGetters('coreForms', ['activePageIndex', 'formPages', 'isFormSubmitting', 'hasNextFormPage', 'hasPrevFormPage'])
  },
  data() {
    return {
      errorMessage: null
    }
  },
  methods: {

    hasFieldErrorMessages(errors) {
      return Object.values(errors).filter(f => f.length !== 0).length
    },
    onCaptchaExpired() {
      if (this.$refs.recaptcha) {
        this.$refs.recaptcha.reset()
      }
    },
    resetValidation() {
      if (this.$refs.observer) this.$refs.observer.reset()
    },
    async validate() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        CoreFormsEventSender.send(CoreFormsEvents.VALIDATION_FAILED);
        return;
      }
      if (this.$refs.recaptcha) {
        this.$refs.recaptcha.execute()
      } else {
        //skip recaptcha if no sitekey is present
        await this.navigateToNextPage()
      }
    },
    async saveInputData() {
      await this.saveInputAsFormData(new FormData(this.$refs.form));
    },
    async finalizeSubmit() {
      await this.saveInputData();
      this.$emit('submit');
      CoreFormsEventSender.send(CoreFormsEvents.WIZARD_COMPLETED)
    },
    onSubmitError() {
      if (error == null || (error['globalError'] == null && error['fieldErrors'] == null)) {
        this.errorMessage = this.getFormsMessage('errorGlobal')
      } else {
        this.errorMessage = error['globalError'] || null
        this.$refs.observer.setErrors(error['fieldErrors'] || {})
      }
      this.onCaptchaExpired()
    },

    /************************************ WIZARD *******************************/

    ...mapActions('coreForms', ['goToPreviousFormPage', 'goToNextFormPage', 'goToFormPage', 'saveInputAsFormData']),
    navigateToPage(pageIndex) {
      //can not navigate to pages in front, only backwards
      if (pageIndex > 0 && pageIndex < this.activePageIndex) {
        this.goToFormPage(pageIndex)
      }
    },
    navigateToPreviousPage() {
      if (this.hasPrevFormPage) {
        this.goToPreviousFormPage()
      }
    },
    async navigateToNextPage() {
      if (this.hasNextFormPage) {
        await this.saveInputData()
        this.goToNextFormPage()
      } else {
        await this.finalizeSubmit()
      }
    }

  },
  mounted() {
    CoreFormsEventSender.send(CoreFormsEvents.WIZARD_STARTED)
  }
}
</script>
