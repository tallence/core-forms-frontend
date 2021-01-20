import {CoreFormsConstants} from "../common/util";

export const getFormSource = (state) => {
  return state.formSource;
}

export const isFormLoading = (state) => {
    return state.formLoading;
};

export const isFormSubmitting = (state) => {
    return state.formSubmitting;
};

export const formSubmitProgress = (state) => {
    return state.formProgress;
}

/** get all form elements from the form definition object loaded from server */
export const formFields = (state) => {
    return (state.formDefinition != null) ? state.formDefinition[CoreFormsConstants.FORM_ELEMENTS] : []
};

/** get a single property from the form definition object */
export const getFormProperty = (state) => {
    return (propName) => {
        return state.formDefinition != null ? state.formDefinition[propName] : null;
    }
}

export const formValues = (state) => {
    return state.formValues;
}

export const getFormValue = (state) => {
    return (fieldId) => {
        return state.formValues != null ? state.formValues[fieldId] : null;
    }
}


