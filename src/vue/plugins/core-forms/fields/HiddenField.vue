<template>
  <input type="hidden"
         :name="field.technicalName"
         :value="field.value"
         :id="field.id"
         readonly/>
</template>

<script>
  export default {
    props: ['field']
  }
</script>
