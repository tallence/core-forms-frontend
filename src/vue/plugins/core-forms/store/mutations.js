import {FORM_DEFINITION, FORM_LOADING, FORM_PROGRESS, FORM_SOURCE, FORM_SUBMITTING, RESET_FORM_VALUES, SET_FORM_VALUE} from "./types";

export default {
  [FORM_SOURCE](state, newValue) {
      state.formSource = newValue;
  },
    [FORM_LOADING](state, newValue) {
        state.formLoading = newValue;
    },
    [FORM_SUBMITTING](state, newValue) {
        state.formSubmitting = newValue;
    },
    [FORM_PROGRESS](state, newValue) {
        state.formProgress = newValue;
    },
    [FORM_DEFINITION](state, newValue) {
        state.formDefinition = newValue;
    },
    [SET_FORM_VALUE](state, payload) {
        if (payload != null) {
            let newValue = {};
            newValue[payload.field] = payload.value;
            state.formValues = {...state.formValues, ...newValue};
        }
    },
    [RESET_FORM_VALUES](state) {
        state.formValues = {};
    }
}
