<template>
    <div class="core-forms__error">

        <div class="core-forms__error-title">
            <h2>{{'errorPageTitle'|formsMessage}}</h2>
        </div>

        <div class="core-forms__error-text">
            <p class="lead">{{'errorPageText'|formsMessage}}</p>
        </div>

        <div class="core-forms__button-panel">
            <router-link to="/" class="btn btn-lg btn-secondary">
                {{'errorPageButton'|formsMessage}}
            </router-link>
        </div>

    </div>
</template>
