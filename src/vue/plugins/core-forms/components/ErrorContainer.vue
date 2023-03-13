<template>
    <transition name="core-forms-app__transition-fade" appear mode="out-in">
        <div class="core-forms__errors alert alert-danger" role="alert" :class="{'alert-dismissible': canDismiss}" v-if="errors">
            <transition-group name="core-forms-app__transition-fade" tag="ul" class="core-forms__errors__list">
                <li class="core-forms__errors__list-item"
                    :key="name"
                    v-for="(error, name, index) in errors">
                    <span class="core-forms__errors__text" :data-error-field="name">{{ error }}</span>
                </li>
            </transition-group>
            <button type="button" class="core-forms__errors__close close"
                    data-dismiss="alert"
                    :aria-label="$translateMessage('inputClose')" :title="$translateMessage('inputClose')"
                    v-if="canDismiss" @click="dismiss">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            'errors': {default: null, required: true},
            'canDismiss': {default: false, required: false}
        },
        methods: {
            dismiss() {
                this.$emit('onDismiss');
            }
        }
    }
</script>
