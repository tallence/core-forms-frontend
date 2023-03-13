<template>
  <div class="core-forms__app">

    <div class="alert alert-warning" v-if="isError">
      <p><strong>{{ $translateMessage('errorPageTitle') }}</strong></p>
      <p>{{ $translateMessage('errorPageText') }}</p>
    </div>

    <div class="alert alert-success" v-if="isSuccess">
      <p><strong>{{ $translateMessage('successPageTitle') }}</strong></p>
      <p>{{ $translateMessage('successPageText') }}</p>
    </div>

    <core-forms v-if="!isSuccess && !isError"
                @onFormError="isError = true"
                @onFormSuccess="isSuccess = true"/>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const isError = ref(false)
const isSuccess = ref(false)
</script>
