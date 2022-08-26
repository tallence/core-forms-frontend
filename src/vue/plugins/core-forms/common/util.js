import Vue from "vue";

export const CoreFormsConstants = {
    FORM_SUBMIT_URL:  'formActionUrl',
    FORM_ELEMENTS:    'formElements',
    FORM_PAGES:       'pages',
    DEFAULT_PAGE:     'DEFAULT_PAGE',
    SUMMARY_PAGE:     'SUMMARY_PAGE'
}

const TYPE_MAPPINGS = {
    'ZipField':           'TextField',
    'PhoneField':         'TextField',
    'StreetNumberField':  'TextField',
    'FaxField':           'TextField',
}

/**
 * helper function to check the loaded form definition: prevent null values, calculate form element size, ...
 * @param formData
 * @returns {{error: string}|*}
 */
export const normalizeFormDefinition = (formData) => {

    if (!formData[CoreFormsConstants.FORM_SUBMIT_URL]) {
        return {error: 'MISSING_REQUIRED_SUBMIT_URL'}
    }
    if (!formData[CoreFormsConstants.FORM_PAGES]) {

      if (!formData[CoreFormsConstants.FORM_ELEMENTS]) {
        return {error: 'MISSING_FORM_ELEMENTS'}
      } else {
        console.warn('converting form elements to paged structure');
        //wrap old form fields into single page
        formData[CoreFormsConstants.FORM_PAGES] = [{
          formElements: formData[CoreFormsConstants.FORM_ELEMENTS]
        }]
        delete formData[CoreFormsConstants.FORM_ELEMENTS]
      }
    }

    formData[CoreFormsConstants.FORM_PAGES].forEach((page, pageIndex) => {

      page.isSummaryPage = page.pageType === CoreFormsConstants.SUMMARY_PAGE;
      if (page.id == null) {
        page.id = 'generated_id_' + pageIndex
      }

      let _colCount = 0;
      page[CoreFormsConstants.FORM_ELEMENTS].forEach((element) => {

        element.studioType = element.type
        if (TYPE_MAPPINGS[element.type] != null) {
          element.type = TYPE_MAPPINGS[element.type]
        }

        //pre initialize values, simply make sure the properties exist
        element.value = element.value || null
        element.validator = element.validator || {}
        element.validator.messages = element.validator.messages || {}
        element.advancedSettings = element.advancedSettings || {}
        element.advancedSettings.columnWidth = element.advancedSettings.columnWidth == null || element.advancedSettings.columnWidth === 0 ? 12 : element.advancedSettings.columnWidth

        /** detect forced line breaks, calculate remaining space in the row of this element */
        _colCount += element.advancedSettings.columnWidth
        if (_colCount >= 12) {
          _colCount = 0
        }
        if (_colCount !== 0 && element.advancedSettings.breakAfterElement === true) {
          element.advancedSettings.rightMargin = 12 - _colCount
          _colCount = 0
        }
      })
    })

    //TODO remove this block
    let summaryPage = {
      id: 'summary_page',
      isSummaryPage: true,
      title: 'Zusammenfassung',
      description: 'An dieser Stelle sehen Sie alle Daten, die sie erfasst haben und übertragen werden.<br/>Bitte überprüfen Sie erneut die Richtigkeit.',
      formElements: []
    }

    //extract consent form fields and move to last page
    formData[CoreFormsConstants.FORM_PAGES].forEach((page, pageIndex) => {
      let consentFields = page[CoreFormsConstants.FORM_ELEMENTS].filter(f => f.type === 'ConsentFormCheckBox')
      consentFields.forEach(f => summaryPage.formElements.push(f));
      page[CoreFormsConstants.FORM_ELEMENTS] = page[CoreFormsConstants.FORM_ELEMENTS].filter(f => f.type !== 'ConsentFormCheckBox')
    });

    formData[CoreFormsConstants.FORM_PAGES].push(summaryPage)
    //TODO end

    return formData;
}

export const registerFieldType = (vueInstance, fieldName, component, isFormFieldType = true) => {
  let propName = isFormFieldType ? '$coreFormsFormFields' : '$coreFormsSummaryFields'
  vueInstance.options[propName] = vueInstance.options[propName] || []
  vueInstance.options[propName].push(fieldName)
  vueInstance.component(fieldName, component.default || component)
}

/**
 * check if a given form element type has a registered Vue component
 */
export const isFieldTypeSupported = (vueInstance, fieldType, isFormFieldType = true) => {
    let propName = isFormFieldType ? '$coreFormsFormFields' : '$coreFormsSummaryFields'
    return fieldType != null && (fieldType in vueInstance.$options.components) && ((vueInstance.$options[propName] || []).indexOf(fieldType) !== -1)
}

export const arrayUnion = (...arrs) => {
    return arrs.reduce((arr1, arr2) => [...new Set([...arr1, ...arr2])])
}

export const arrayWithout = (array, elem) => {
    return array.filter(function(value) {
        return value !== elem
    })
}

export default {
    registerFieldType,
    isFieldTypeSupported,
    normalizeFormDefinition,
    arrayUnion,
    arrayWithout
}
