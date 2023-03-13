<template>
    <div :class="{'spacer-area': inlineMode, 'core-forms__spinner-overlay': !inlineMode }">
        <div>
            <div class="core-forms__spinner"></div>
            <div class="core-forms__spinner__content">
                <slot></slot>
            </div>
            <div class="core-forms__spinner__progress" v-if="displayProgress && formSubmitProgress !== 0">
                <div class="core-forms__spinner__progress-done" :style="{ 'width': formSubmitProgress + '%'}"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "pinia"
    import {useCoreFormsStore} from '../common/store'

    export default {
        props: {
            'inlineMode': {required: false, default: false},
            'displayProgress': {required: false, default: false}
        },
        computed: {
            ...mapState(useCoreFormsStore, ['formSubmitProgress'])
        }
    }
</script>
