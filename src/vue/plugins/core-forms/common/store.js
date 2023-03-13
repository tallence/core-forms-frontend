import {defineStore} from "pinia"
import {CoreFormsConstants, normalizeFormDefinition} from '../common/util'
import {EventConstants, EventSender} from '../common/events'

import axios from 'axios'

export const useCoreFormsStore = defineStore('core-forms/storage', {
  state() {
    return {
      formSource: undefined,
      /*status for form loading */
      formLoading: false,
      /* status for form submit */
      formSubmitting: false,
      /* submit progress */
      formProgress: null,
      /* raw form definition */
      formDefinition: null,
      /* formValues */
      fieldValues: {},
      /* saved data for the actual submit */
      formSubmitData: {},
      /* active form page */
      activePageIndex: 0
    }
  },
  getters: {

    /** get all form elements from the form definition, ignore paging */
    allFormFields: (state) => {
      let fields = []
      state.formPages.forEach(page => {
        fields = fields.concat(page[CoreFormsConstants.FORM_ELEMENTS])
      })
      return fields
    },

    fieldById: (state) => (id) => {
      let matchingFields = this.allFormFields.filter(e => e['id'] === id)
      return matchingFields.length ? matchingFields[0] : null
    },

    fieldsByReferenceId: (state) => (referencedId) => {
      return state.allFormFields.filter(e => e['referencedFieldId'] === referencedId)
    },

    activePageData: (state) => {
      let page = state.formPage(state.activePageIndex)

      if (page) {
        return {
          id: page.id,
          title: page.title,
          description: page.description,
          icon: page.icon
        }
      }
      return {}
    },

    formPage: (state) => (pageIndex) => {
      let pages = (state.formDefinition != null) ? state.formDefinition[CoreFormsConstants.FORM_PAGES] || [] : []
      return (pageIndex >= 0 && pageIndex <= pages.length - 1) ? pages[pageIndex] : null
    },

    /** get all form elements from the form definition object loaded from server */
    formPages: (state) => (state.formDefinition != null) ? state.formDefinition[CoreFormsConstants.FORM_PAGES] || [] : [],
    previousFormPages: (state) => state.formPages.slice(0, state.activePageIndex),
    hasNextFormPage: (state) => state.activePageIndex < (state.formPages.length - 1),
    hasPreviousFormPage: (state) => state.activePageIndex > 0,

    formProperty: (state) => (propName) => state.formDefinition != null ? state.formDefinition[propName] : null,
    formFieldValue: (state) => (fieldId) => state.fieldValues != null ? state.fieldValues[fieldId] : null,

    submitData: (state) => {
      let submitData = new FormData()
      Object.values(state.formSubmitData).forEach(pageData => {
        for (let entry of pageData.entries()) {
          submitData.append(entry[0], entry[1])
        }
      })
      return submitData
    }
  },
  actions: {

    async loadForm(loadUrl) {
      this.formSource = loadUrl

      return new Promise((resolve, reject) => {
        this.formLoading = true
        this.formValues = {}
        this.formSubmitData = {}

        const onSuccess = (formData) => {
          this.formDefinition = formData
          EventSender.send(EventConstants.FORM_LOADED)
          resolve()
        }

        const onFailure = (error) => {
          this.formDefinition = null
          EventSender.send(EventConstants.FORM_FAILED, error)
          reject(error)
        }

        if (!loadUrl) {
          return onFailure('MISSING_REQUIRED_LOAD_URL')
        }

        axios.get(loadUrl)
          .then(response => onSuccess(normalizeFormDefinition(response.data)))
          .catch(onFailure)
          .finally(() => {
            this.activePageIndex = 0
            this.formLoading = false
          })
      })
    },

    /**
     * Main method to submit the form data
     *
     * @param commit
     * @param getters
     * @param submitData
     */
    async submitForm() {
      return new Promise((resolve, reject) => {
        EventSender.send(EventConstants.FORM_SUBMIT)
        this.formSubmitting = true
        this.formProgress = null

        let url = this.formProperty(CoreFormsConstants.FORM_SUBMIT_URL)
        if (url == null) {
          this.formSubmitting = false
          reject({error: 'MISSING_REQUIRED_SUBMIT_URL'})
          return
        }
        axios.post(url, this.submitData, {
          onUploadProgress: function (progressEvent) {
            this.formProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          }
        }).then((response) => {
          EventSender.send(EventConstants.FORM_SUBMITTED)
          this.formDefinition = null
          this.formValues = {}
          this.formSubmitData = {}
          this.activePageIndex = 0
          resolve(response.data['successData'])
        })
          .catch(error => {
            reject((error['body'] || {})['errorData'])
          })
          .finally(() => {
            this.formProgress = 0
            this.formSubmitting = false
          })
      })
    },

    setFormFieldValue(fieldId, fieldValue) {
      let newValue = {}
      newValue[fieldId] = fieldValue
      this.fieldValues = {...this.fieldValues, ...newValue}
    },

    saveInputAsFormData(formData) {
      if (formData != null) {
        this.formSubmitData[`${this.activePageIndex}`] = formData
      }
    },

    goToPreviousFormPage() {
      this.activePageIndex = Math.max(0, this.activePageIndex - 1)
      EventSender.send(EventConstants.WIZARD_PREV_PAGE)
      EventSender.send(EventConstants.WIZARD_NAVIGATION, {data: this.activePageIndex})
    },

    goToNextFormPage() {
      this.activePageIndex = Math.min(this.activePageIndex + 1, (this.formDefinition[CoreFormsConstants.FORM_PAGES] || []).length - 1)
      EventSender.send(EventConstants.WIZARD_NEXT_PAGE)
      EventSender.send(EventConstants.WIZARD_NAVIGATION, {data: this.activePageIndex})
    },

    goToFormPage(newPage = 0) {
      if (newPage >= 0 && newPage < (this.formDefinition[CoreFormsConstants.FORM_PAGES] || []).length) {
        this.activePageIndex = newPage
      }
      EventSender.send(EventConstants.WIZARD_NAVIGATION, {data: this.activePageIndex})
    }

  }
})
