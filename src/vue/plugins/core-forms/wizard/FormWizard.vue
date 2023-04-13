<template>
  <vee-form v-slot="{ handleSubmit, errors }"
            ref="veeForm"
            slim>

    <form @submit.prevent="handleSubmit(confirmCurrentPage)"
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
                 @click="navigateToPage(pageIndex)">{{ formPage.title || (pageIndex + 1) }}</a>
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
            <div class="col-xs-12 col-md-6">

              <core-forms-captcha v-if="!hasNextFormPage"
                                  @onCaptchaCompleted="submitData"
                                  ref="captcha"></core-forms-captcha>

              <button type="button"
                      v-if="hasPreviousFormPage"
                      :disabled="!hasPreviousFormPage || isFormSubmitting"
                      @click="navigateToPreviousPage"
                      class="btn btn-text core-forms__prev">
                {{ $translateMessage('prevPageButton') }}
              </button>

              <button type="submit"
                      :disabled="isFormSubmitting || isCaptchaActive"
                      class="btn btn-primary core-forms__submit"
                      :class="{
                        'btn--disabled': isFormSubmitting || isCaptchaActive,
                        'btn--captcha-active': isCaptchaActive
                      }">
                {{ $translateMessage(hasNextFormPage ? 'nextPageButton' : 'submitButton') }}
              </button>
            </div>

            <div class="col-xs-12 col-md-6 text-right">
              <div class="core-forms__required-hint required-asterisk"
                   :class="{'form-has-errors': hasFieldErrorMessages(errors) }">
                {{ $translateMessage('inputMandatory') }}
              </div>
            </div>

          </div>

        </div>
      </div>
    </form>
  </vee-form>

</template>

<script>
import {CoreFormsEvents, CoreFormsEventSender} from "../index"
import {useCoreFormsStore} from '../common/store'
import {mapActions, mapState} from 'pinia'

export default {
  name: 'FormWizard',
  replace: true,
  computed: {
    ...mapState(useCoreFormsStore, ['activePageIndex', 'formPages', 'isFormSubmitting', 'hasNextFormPage', 'hasPreviousFormPage']),
    isCaptchaActive() {
      return this.$refs.captcha?.isActive() && this.isSubmitTriggered;
    }
  },
  emits: ['submit'],
  data() {
    return {
      isSubmitTriggered: false,
      errorMessage: null
    }
  },
  methods: {

    /************************************ VALIDATION *******************************/

    async confirmCurrentPage() {
      const isValid = await this.$refs.veeForm?.validate()
      if (!isValid) {
        CoreFormsEventSender.send(CoreFormsEvents.VALIDATION_FAILED)
        return
      }

      if (this.hasNextFormPage) {
        this.isSubmitTriggered = false;
        await this.navigateToNextPage()
      } else {
        this.isSubmitTriggered = true;
        this.$refs.captcha?.execute()
      }
    },

    hasFieldErrorMessages(errors) {
      return errors != null && errors.length
    },

    resetValidation() {
      this.isSubmitTriggered = false;
      this.$refs.veeForm?.reset()
      this.$refs.captcha?.reset()
    },

    /************************************ WIZARD *******************************/

    ...mapActions(useCoreFormsStore, ['goToPreviousFormPage', 'goToNextFormPage', 'goToFormPage', 'saveInputAsFormData']),
    navigateToPage(pageIndex) {
      //can not navigate to pages in front, only backwards
      if (pageIndex > 0 && pageIndex < this.activePageIndex) {
        this.$refs.captcha?.reset()
        this.goToFormPage(pageIndex)
      }
    },
    navigateToPreviousPage() {
      if (this.hasPreviousFormPage) {
        this.$refs.captcha?.reset()
        this.goToPreviousFormPage()
      }
    },
    async navigateToNextPage() {
      if (this.hasNextFormPage) {
        await this.saveInputData()
        this.goToNextFormPage()
      }
    },

    /************************************ SUBMIT *******************************/

    async saveInputData() {
      await this.saveInputAsFormData(new FormData(this.$refs.form))
    },

    async submitData() {
      if (!this.isSubmitTriggered) return;

      await this.saveInputData()
      this.$emit('submit')
      CoreFormsEventSender.send(CoreFormsEvents.WIZARD_COMPLETED)
    },

    onSubmitError(error) {
      if (error == null || (error['globalError'] == null && error['fieldErrors'] == null)) {
        this.errorMessage = this.$translateMessage('errorGlobal')
      } else {
        this.errorMessage = error['globalError'] || null
        this.$refs.veeForm?.setErrors(error['fieldErrors'] || {})
      }

      this.isSubmitTriggered = false;
      this.$refs.captcha.reset()
    }
  },
  mounted() {
    CoreFormsEventSender.send(CoreFormsEvents.WIZARD_STARTED)
  }
}
</script>
