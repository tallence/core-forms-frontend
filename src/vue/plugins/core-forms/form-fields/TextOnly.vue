<template>
  <div class="core-forms__textonly" v-if="isRendered">
    <h4 class="form__hl-md">
      {{ field.name }}
    </h4>
    <p class="muted">
      {{ field.hint }}
    </p>
  </div>
</template>

<script>
import FormElementVisibilityMixin from "../mixins/FormElementVisibilityMixin";

export default {
  mixins: [FormElementVisibilityMixin]
}
</script>
