<template>
  <core-forms
    @onFormError="goToErrorPage"
    @onFormSuccess="goToSuccessPage"/>
</template>

<script>
  export default {
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
