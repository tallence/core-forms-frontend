import {
  FORM_DEFINITION,
  FORM_LOADING,
  FORM_PROGRESS,
  FORM_SOURCE,
  FORM_SUBMITTING,
  RESET_FORM_VALUES,
  RESET_PAGE, SET_FORM_DATA_FOR_PAGE,
  SET_FORM_VALUE,
  SET_NEXT_PAGE,
  SET_PAGE,
  SET_PREV_PAGE
} from "./types";
import {CoreFormsConstants} from "../common/util";

export default {
  [FORM_SOURCE](state, newValue) {
      state.formSource = newValue
  },
    [FORM_LOADING](state, newValue) {
        state.formLoading = newValue
    },
    [FORM_SUBMITTING](state, newValue) {
        state.formSubmitting = newValue
    },
    [FORM_PROGRESS](state, newValue) {
        state.formProgress = newValue
    },
    [FORM_DEFINITION](state, newValue) {
        state.formDefinition = newValue
    },
    [SET_FORM_VALUE](state, payload) {
        if (payload != null) {
            let newValue = {}
            newValue[payload.field] = payload.value
            state.formValues = {...state.formValues, ...newValue}
        }
    },
    [RESET_FORM_VALUES](state) {
        state.formValues = {}
        state.formSubmitData = {}
    },
    [SET_FORM_DATA_FOR_PAGE](state, formDataPayload) {
      if (formDataPayload != null) {
        state.formSubmitData[`${state.activePageIndex}`] = formDataPayload
      }
    },
    [SET_PAGE](state, newValue) {
      if (newValue >= 0 && newValue < (state.formDefinition[CoreFormsConstants.FORM_PAGES] || []).length) {
        state.activePageIndex = newValue
      }
    },
    [RESET_PAGE](state) {
      state.activePageIndex = 0
    },
    [SET_NEXT_PAGE](state) {
      state.activePageIndex = Math.min(state.activePageIndex + 1, (state.formDefinition[CoreFormsConstants.FORM_PAGES] || []).length - 1)
    },
    [SET_PREV_PAGE](state) {
      state.activePageIndex = Math.max(0, state.activePageIndex - 1)
    }
}
