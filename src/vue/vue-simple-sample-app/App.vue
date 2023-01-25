<template>
  <div class="core-forms__app">

    <div class="alert alert-warning" v-if="isError">
      <p><strong>{{'errorPageTitle'|formsMessage}}</strong></p>
      <p>{{'errorPageText'|formsMessage}}</p>
    </div>

    <div class="alert alert-success" v-if="isSuccess">
      <p><strong>{{'successPageTitle'|formsMessage}}</strong></p>
      <p>{{'successPageText'|formsMessage}}</p>
    </div>

    <core-forms v-if="!isSuccess && !isError"
                @onFormError="isError = true"
                @onFormSuccess="isSuccess = true"/>
  </div>
</template>

<script>
  export default {
    name: 'CoreFormsSimpleSampleApp',
    data() {
      return {
        isError: false,
        isSuccess: false
      }
    }
  }
</script>
