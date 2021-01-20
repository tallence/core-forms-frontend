<template>
    <div class="core-forms__success">

        <div class="core-forms__success-title"
             v-if="hasFormsMessage('successPageTitle')">
            <h2>{{'successPageTitle'|formsMessage}}</h2>
        </div>

        <div class="core-forms__success-text cm-details__text cm-richtext"
             v-if="hasFormsMessage('successPageText')"
             v-html="getFormsMessage('successPageText')">
        </div>

        <div class="core-forms__button-panel">
            <button class="btn btn-lg btn-secondary" @click="confirm">
                {{ (hasFormsMessage('successPageButton') ? 'successPageButton' : 'inputClose')|formsMessage}}
            </button>
        </div>

    </div>
</template>

<script>
    export default {
        methods: {
            confirm() {
                this.$router.push({ name: 'form'});
            }
        }
    }
</script>
