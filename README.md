# CoreForms Sample Theme

This is an example for the frontend part of the [Core-Forms](https://github.com/tallence/core-forms) repository. \
It contains a theme for the CoreMedia Frontend-Development Workspace.

The theme itself contains 2 samples of a VueJS based form application.

### Installation

Please refer to the [CoreMedia documentation](https://www.coremedia.com/services/downloads) on how to create and deploy themes.\
This is not a standalone project, integrate this sample theme into your existing frontend workspace.

The sample theme has dependencies to the following CoreMedia frontend modules:
* @coremedia/cm-cli
* @coremedia/theme-utils
* @coremedia/brick-page
* @coremedia/brick-preview

### Theme & Style

* This sample themes only provides the minimal templates, styles and javascript files for the CoreForms integration, no other page layout or templates are provided.
* The theme will also add a Studio preview for your forms.
* The theme is based on [_Bootstrap 4_](https://github.com/twbs/bootstrap). \
The app utilizes the grid system and the recommended markup for the form validation of Bootstrap.

### VueJS Application

* core forms frontend integration implemented as [_VueJS_](https://github.com/vuejs/vue) plugin.
* dependencies: [_Vuex_](https://github.com/vuejs/vuex), [_VueResource_](https://github.com/pagekit/vue-resource)
* client side validation with error messages and highlighting with [_vee-validate_](https://github.com/logaretm/vee-validate).
* additional plugin for text messages and translations
* additional plugin for new form elements (adding the DatePicker field using [_vue-datetime_](https://github.com/mariomka/vue-datetime))
* (optional) spam protection with Google Recaptcha. 
* markup and styling based on [_Bootstrap 4_](https://github.com/twbs/bootstrap).

&nbsp;  

&nbsp;  

&nbsp;  

---
#### Older version

_Another example implementation can be found under branch [``frontend_brick``](https://github.com/tallence/core-forms-frontend/tree/frontend_brick): \
Integration into existing themes as CM Brick, server side rendering of the form, client side validation_

---
