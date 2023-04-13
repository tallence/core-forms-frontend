<template>
  <form-element :validation-rules="validatorRules"
                        :form-field="field">
    <template v-slot="props">
      <file-upload-input v-model="field.value"
                         :field-name="field.technicalName"
                         :field-id="field.id"
                         :default-label="$translateMessage('inputFileEmpty')"
                         :remove-label="$translateMessage('inputFileRemove')"
                         :browse-label="$translateMessage('inputFileBrowse')"
                         :css-classes="props.validator.classes"></file-upload-input>
    </template>
  </form-element>
</template>

<script>
import FileUploadInput from '../components/FileUploadInput'
import FormElementValidationMixin from "../mixins/FormElementValidationMixin"

export default {
  mixins: [FormElementValidationMixin],
  components: {'file-upload-input': FileUploadInput},
  beforeMount() {
    this.addFileSizeBasedValidationRules()
  }
}
</script>
