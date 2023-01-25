import {CoreFormsConstants} from "../common/util";

export const getFormSource = (state) => {
  return state.formSource
}

export const isFormLoading = (state) => {
    return state.formLoading
};

export const isFormSubmitting = (state) => {
    return state.formSubmitting
};

export const formSubmitProgress = (state) => {
    return state.formProgress
}

/** get all form elements from the form definition, ignore paging */

export const allFormFields = (state, getters) => {
  let fields = []
  getters.formPages.forEach(page => {
    fields = fields.concat(page[CoreFormsConstants.FORM_ELEMENTS])
  })
  return fields
};

export const getFieldById = (state, getters) => {
  return (fieldId) => {
    let matchingFields = getters.allFormFields.filter(e => e['id'] === fieldId)
    return matchingFields.length ? matchingFields[0] : null
  }
}

export const getFieldsByReferencedId = (state, getters) => {
  return (referencedId) => {
    return getters.allFormFields.filter(e => e['referencedFieldId'] === referencedId)
  }
}

export const activePageIndex = (state) => {
  return state.activePageIndex
}

export const activePageData = (state, getters) => {
  let page = getters.formPage(state.activePageIndex)

  if (page) {
      return {
        id: page.id,
        title: page.title,
        description: page.description,
        icon: page.icon
      }
  }
  return {}
}

export const formPage = (state) => {
  return (pageIndex) => {
    let pages = (state.formDefinition != null) ? state.formDefinition[CoreFormsConstants.FORM_PAGES] || [] : []
    return (pageIndex >= 0 && pageIndex <= pages.length - 1) ? pages[pageIndex] : null
  }
};

/** get all form elements from the form definition object loaded from server */
export const formPages = (state) => {
  return (state.formDefinition != null) ? state.formDefinition[CoreFormsConstants.FORM_PAGES] || [] : []
};

export const previousFormPages = (state, getters) => {
  return getters.formPages.slice(0, state.activePageIndex)
};

export const hasNextFormPage = (state, getters) => {
  return state.activePageIndex < (getters.formPages.length - 1)
}

export const hasPrevFormPage = (state) => {
  return state.activePageIndex > 0
}

/** get a single property from the form definition object */

export const getFormProperty = (state) => {
    return (propName) => {
        return state.formDefinition != null ? state.formDefinition[propName] : null
    }
}

export const formValues = (state) => {
    return state.formValues
}

export const getFormValue = (state) => {
    return (fieldId) => {
        return state.formValues != null ? state.formValues[fieldId] : null
    }
}

export const getSubmitFormData = (state) => {
  let submitData = new FormData()
  Object.values(state.formSubmitData).forEach(pageData => {
    for (let entry of pageData.entries()) {
      submitData.append(entry[0], entry[1])
    }
  });
  return submitData
}


