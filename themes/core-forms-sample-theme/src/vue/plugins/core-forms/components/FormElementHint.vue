<template>
    <small class="form-text text-muted" v-html="text"></small>
</template>

<script>
    export default {
        replace: true,
        props: ['text']
    }
</script>
