<template>
  <core-forms
    :recaptcha="recaptchaKey"
    :load-url="formUrl"
    @onFormError="goToErrorPage"
    @onFormSuccess="goToSuccessPage"/>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    computed: {
      ...mapGetters(["formUrl", "recaptchaKey"])
    },
    methods: {
      goToSuccessPage() {
        this.$router.push({name: 'success'});
      },
      goToErrorPage() {
        this.$router.push({name: 'error'});
      }
    }
  }
</script>
