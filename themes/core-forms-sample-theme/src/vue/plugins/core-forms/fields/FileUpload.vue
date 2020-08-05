<template>
    <form-element-wrapper :validation-rules="validatorRules"
                          :field="field">
        <template slot-scope="props">
            <file-upload-input v-model="field.value"
                               :field-name="field.technicalName"
                               :field-id="field.id"
                               :default-label="'inputFileEmpty'|formsMessage"
                               :remove-label="'inputFileRemove'|formsMessage"
                               :browse-label="'inputFileBrowse'|formsMessage"
                               :css-classes="props.validator.classes"></file-upload-input>
        </template>
    </form-element-wrapper>
</template>

<script>
    import FileUploadInput from '../components/FileUploadInput';
    import FormElementValidationMixin from "../mixins/FormElementValidationMixin";

    export default {
        mixins: [FormElementValidationMixin],
        components: {'file-upload-input': FileUploadInput},
        beforeMount() {
            this.addFileSizeBasedValidationRules()
        }
    }
</script>
