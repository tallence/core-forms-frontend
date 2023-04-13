import {useCoreFormsStore} from '../common/store'

/**
 * this mixin adds all visibility functions to a form field element
 */
const FormElementVisibilityMixin = {
  props: {
    formField: {
      type: Object,
      required: true
    }
  },
  computed: {
    isRendered() {
      if (!this.formField || !this.$isFieldSupported(this.formField.type)) {
        return false
      }
      return this.isFieldVisible(this.formField)
    }
  },
  methods: {
    hasFieldValue(fieldId, expectedValues = []) {

      const { formFieldValue } = useCoreFormsStore()

      /* the linked/referenced field is actually visible, check if the values match */
      let storedValue = formFieldValue(fieldId)
      let relatedValues = Array.isArray(storedValue) ? storedValue : (storedValue != null ? [storedValue] : [])

      return expectedValues != null && expectedValues.some(target => relatedValues.includes(target))
    },
    /**
     * main method to determine if the current field should be rendered at all.
     *
     * per default a field is always rendered.
     * in the studio the editor can set the visibility depending on the value of another field.
     * in this case we need to find the fields and check if the condition is fulfilled.
     *
     * (a recursive check is required!)
     */
    isFieldVisible(fieldDefinition, forcedValueCheck = false) {
      let self = this

      const { fieldById, fieldsByReferenceId } = useCoreFormsStore()

      if (fieldDefinition
        && fieldDefinition['advancedSettings']
        && fieldDefinition['advancedSettings']['visibility']
        && fieldDefinition['advancedSettings']['visibility']['activated'] === true) {

        let targetValues = [fieldDefinition['advancedSettings']['visibility']['value']]
        let elementId = fieldDefinition['advancedSettings']['visibility']['elementId']

        /**
         * VARIANT A:
         * the field is linked directly to another known field via ID
         *
         * check visibility and compare values
         */
        let linkedField = fieldById(elementId)
        if (linkedField != null) {
          return this.isFieldVisible(linkedField, forcedValueCheck) && self.hasFieldValue(elementId, targetValues)
        }

        /**
         * VARIANT B:
         * the field is only referenced by an referencedFieldId
         *
         * no field found, check if fields are referenced by an additional referenceFieldId attribute (e.g. that's the case for subject fields)
         * it's possible, that more than one field is linked here, at least one of those fields should be visible and contain the target value
         *
         * we cannot do a value comparison here, since we only have a reference id.
         * the check will be done recursively, only one fulfilled condition of a subfield is required
         */

        let referencedFields = fieldsByReferenceId(elementId)
        return (referencedFields || []).some(referencedField => self.isFieldVisible(referencedField) && self.hasFieldValue(referencedField.id, targetValues))
      }

      return true
    }
  }
};

export default FormElementVisibilityMixin
