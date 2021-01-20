<template>
    <transition name="core-forms__app__transition-fade" appear mode="out-in">

        <!-- ################################################### LOADING STATE INITIAL-->
        <form-load-spinner v-if="isFormLoading" :inline-mode="true"/>

        <!-- ################################################### REGULAR STATE-->
        <div v-if="!isFormLoading">

            <!-- ################################################### SUBMIT STATE-->
            <form-load-spinner v-if="isFormSubmitting" :inline-mode="false" :display-progress="hasFileUploads">
                {{'submitActive'|formsMessage}}
            </form-load-spinner>

            <vee-observer v-slot="{ handleSubmit, errors }"
                          ref="observer"
                          slim>

                <form @submit.prevent="handleSubmit(submit)"
                      ref="form"
                      novalidate
                      autocomplete="on">

                    <div class="form-group form-group-text core-forms__intro cm-details__text cm-richtext"
                         v-if="formIntroText"
                         v-html="formIntroText">
                    </div>

                    <div class="row row-equal">
                        <div v-for="field in formFields"
                             :key="field.id"
                             :class="field.advancedSettings|columnClass">
                            <transition name="core-forms__app__transition-fade" mode="out-in">
                                <component v-if="isSupported(field.type)"
                                           :is="field.type"
                                           :field="field"
                                           :data-field-type="field.type"/>
                            </transition>
                        </div>
                    </div>

                    <form-error-wrapper :errors="errorMessage != null ? {global: [errorMessage]} : null"
                                        :can-dismiss="true"
                                        @onDismiss="errorMessage = null"></form-error-wrapper>

                    <form-error-wrapper v-validation-error-summary-visible
                                        :can-dismiss="false"
                                        :errors="hasFieldErrorMessages(errors) ? errors : null"></form-error-wrapper>

                    <div class="row">
                        <div class="col-xs-12 col-md-6">

                            <vue-recaptcha v-if="recaptcha"
                                           :sitekey="recaptcha"
                                           ref="recaptcha"
                                           size="invisible"
                                           @verify="onSubmitForm"
                                           @expired="onCaptchaExpired"
                                           :loadRecaptchaScript="true">
                            </vue-recaptcha>

                            <button type="submit"
                                    :disabled="isFormSubmitting"
                                    class="btn btn-primary btn-lg core-forms__submit">
                                {{'submitButton'|formsMessage}}
                            </button>
                        </div>
                        <div class="col-xs-12 col-md-6 text-right">
                            <div class="core-forms__required-hint required-asterisk"
                                 :class="{'form-has-errors': hasFieldErrorMessages(errors) }">
                                {{'inputMandatory'|formsMessage}}
                            </div>
                        </div>
                    </div>
                </form>
            </vee-observer>
        </div>
    </transition>

</template>

<script>
    import {mapGetters} from "vuex";
    import {CoreFormsEvents, CoreFormsEventSender, CoreFormsUtils} from "./index";

    export default {
        name: 'FormPage',
        replace: true,
        props: {
            loadUrl: {required: false, type: String, default: undefined},
            recaptcha: {required: false, type: String, default: null}
        },
        computed: {
            ...mapGetters('coreForms', ['isFormLoading', 'isFormSubmitting', 'formFields', 'formValues']),
            formIntroText() {
                return this.$store.getters['coreForms/getFormProperty']("introText");
            },
            hasFileUploads() {
                return this.formFields && this.formFields.filter(e => e.type === 'FileUpload' && e.value != null).length;
            }
        },
        data() {
            return {
                errorMessage: null
            }
        },
        methods: {
            isSupported(type) {
                return CoreFormsUtils.isFormFieldTypeSupported(type)
            },
            hasFieldErrorMessages(errors) {
                return Object.values(errors).filter(f => f.length !== 0).length;
            },
            submit() {
                this.$refs.observer.validate();
                if (this.$refs.recaptcha) {
                    this.$refs.recaptcha.execute();
                } else {
                    //skip recaptcha if no sitekey is present
                    this.onSubmitForm();
                }
            },
            onCaptchaExpired() {
              if (this.$refs.recaptcha) {
                  this.$refs.recaptcha.reset();
              }
            },
            async onLoadForm() {
                try {
                    await this.$store.dispatch('coreForms/loadForm', this.loadUrl);
                    this.$nextTick(() => {
                        if (this.$refs.observer) this.$refs.observer.reset();
                    })
                } catch (err) {
                    this.$emit('onFormError', err);
                }
            },
            async onSubmitForm() {
                try {
                    let result = await this.$store.dispatch('coreForms/submitForm', new FormData(this.$refs.form));
                    if (result) {
                      this.$addFormsMessage({
                        successPageTitle: result['textHeader'],
                        successPageText: result['textMessage'],
                        successPageButton: result['textButton']
                      });
                    }
                    this.$emit('onFormSuccess');
                } catch (error) {
                    if (error == null || (error['globalError'] == null && error['fieldErrors'] == null)) {
                        this.errorMessage = this.getFormsMessage('errorGlobal')
                    } else {
                        this.errorMessage = error['globalError'] || null;
                        this.$refs.observer.setErrors(error['fieldErrors'] || {});
                    }
                    this.onCaptchaExpired();
                }
            },
        },
        mounted() {
            CoreFormsEventSender.init(this.$root);
            CoreFormsEventSender.send(CoreFormsEvents.APPLICATION_LOADED);
            this.onLoadForm();
        }
    }
</script>
