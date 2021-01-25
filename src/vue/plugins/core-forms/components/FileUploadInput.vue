<template>
  <div class="core-forms__file-upload-input">
    <div class="custom-file custom-file-icon-only" :class="{'custom-file--selected': innerFile}">
      <input type="file"
             :name="fieldName"
             :id="fieldId"
             class="custom-file-input"
             ref="uploadInput"
             @change="handleFileChange">

      <button v-if="innerFile"
              type="button" class="core-forms__file-remove close"
              :aria-label="removeLabel" :title="removeLabel"
              @click.stop="handleFileChange">
        <span aria-hidden="true">&times;</span>
      </button>

      <label class="custom-file-label" :for="fieldId" :data-browse="browseLabel">
        <span v-if="innerFile" :title="innerFile.name">{{innerFile.name}}</span>
        <span v-else>{{defaultLabel}}</span>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {type: File, default: null},
      fieldName: {required: true, type: String},
      fieldId: {required: true, type: String},
      cssClasses: {required: false, default: null},
      browseLabel: {required: false, default: 'Browse'},
      removeLabel: {required: false, default: 'Remove selected file.'},
      defaultLabel: {required: false, default: 'Please select a file'}
    },
    computed: {
      innerFile: {
        get() {
          return this.value
        },
        set(newValue) {
          this.$emit('input', newValue)
        }
      }
    },
    methods: {
      handleFileChange(e) {
        if (e && e.target.files && e.target.files.length) {
          this.innerFile = e.target.files[0];
        } else {
          this.innerFile = null;
          try {
            this.$refs.uploadInput.value = '';
            if (this.$refs.uploadInput.value) {
              //toggle of the type is required to reset the field completely
              this.$refs.uploadInput.type = "text";
              this.$refs.uploadInput.type = "file";
            }
          } catch (e) {
          }
        }
      }
    }
  }
</script>
