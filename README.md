# CoreForms Sample Theme

This is an example for the frontend part of the [Core-Forms](https://github.com/tallence/core-forms) repository.
It contains a sample theme with minimal templates, Studio preview, required styles and Javascript files for the CoreMedia Frontend-Development Workspace.

Tested with ``cmcc-10-1907``, ``cmcc-10-2004`` and ``cmcc-10-2010``.




## Installation & Build

Please refer to the [CoreMedia documentation](https://www.coremedia.com/services/downloads) on how to create, build and deploy themes.

You can add this repository as submodule to your frontend workspace:
````bash
git submodule add https://github.com/tallence/core-forms-frontend.git frontend/themes/core-forms-sample-theme
````

The sample theme has dependencies to the following CoreMedia frontend modules:
* ``@coremedia/cm-cli``
* ``@coremedia/theme-utils``
* ``@coremedia/brick-page``
* ``@coremedia/brick-preview``



## VueJS Application

The provided sample application has dependencies to the following projects:
* [VueJS](https://github.com/vuejs/vue)
* [Vuex](https://github.com/vuejs/vuex)
* [VueResource](https://github.com/pagekit/vue-resource)
* [vee-validate](https://github.com/logaretm/vee-validate) for client side validation with error messages and highlighting
* [Bootstrap 4](https://github.com/twbs/bootstrap) for markup and base styling
* (_optional_) [vue-datetime](https://github.com/mariomka/vue-datetime) for adding a DatePicker component, also see section [Custom fields](#custom-fields)
* (_optional_) [vue-recaptcha](https://github.com/DanSnow/vue-recaptcha) for spam protection with [Google Recaptcha](https://www.google.com/recaptcha/about/).




### Plugins

The core functionality is completely implemented as separate plugin.\
This way you can easily add it into your existing VueJS application.\
If you are not using VueJS yet, please check the [examples](#examples) below.


##### (1) Core Forms Plugin

This plugin contains the main logic of the application:\
loading data, rendering of the complete form, submitting the user input, client side validation, ...

Add the plugin to your application:
````javascript
Vue.use(CoreFormsPlugin, {_options_});
````

This plugin provides a component which will render the complete form:
`````html
<core-forms :recaptcha="_RECAPTCHA_SITE_KEY_"
            :load-url="_REMOTE_URL_"
            @onFormSuccess="successCallback"
            @onFormError="errorCallback" />
`````

Please refer to the sources (``_THEME_ROOT_/src/vue/plugins/core-forms/``) or the [examples](#examples) for more details.



##### (2) Core Forms Messages Plugin

It is not necessary to provide multi language translations to the app. Instead we are passing all already translated texts directly to the app.
The CoreFormsMessagePlugin is responsible for storing and providing all texts which are required by the app.
All required texts are part of the generated markup or get loaded directly with the form definition itself.

Please refer to the sources (``_THEME_ROOT_/src/vue/plugins/core-forms-messages/``) or the complete examples for more details.\
This plugin gets added automatically when using the _Core Forms Plugin_.


##### (3) Core Forms Validation Plugin

This plugin is responsible for the client side validation. It holds all the client side validation logic.\
Please refer to the source for more information: **``_THEME_ROOT_/src/vue/plugins/core-forms-validation``**\
This plugin gets added automatically when using the _Core Forms Plugin_.



### Examples

##### (1) Minimal Vue App 

If you just want to render the forms, then this is our recommended approach.\
Please refer to the sources for more information: **``_THEME_ROOT_/src/vue/vue-simple-sample-app/main.js``**

To activate this app, put the following code into your main javascript file ``_THEME_ROOT_/src/js/core-forms-sample.js``:
```javascript
import CoreFormsSimpleSampleApp from '../vue/vue-simple-sample-app/main';
$(function () {
  $('[data-form="vue-sample-app"]').vueSampleApp(CoreFormsSimpleSampleApp);
});
```



##### (2) Vue App with Vue Router

Use this example as a base if you want to build a more complex app with multiple different views.\ 
Please refer to the source for more information: **``_THEME_ROOT_/src/vue/vue-router-sample-app/main.js``**

To activate this app, put the following code into your main javascript file ``_THEME_ROOT_/src/js/core-forms-sample.js``:
```javascript
import CoreFormsSimpleSampleApp from '../vue/vue-simple-sample-app/main';
$(function () {
  $('[data-form="vue-sample-app"]').vueSampleApp(CoreFormsSimpleSampleApp);
});
```



### Custom fields

To add custom fields, you can modify the source of the main plugin directly, but the recommended way to add a custom fields is creating a separate Vue plugin.\
An additional plugin for the CoreForms app requires the following steps:
* Register custom validation rules
* Register custom form field component
* Register your custom plugin

As an example we included the DatePicker field as additional plugin: 
``_THEME_ROOT_\src\vue\shared\date-picker-plugin``.



## Styles

The theme is based on [Bootstrap 4](https://github.com/twbs/bootstrap). \
The app utilizes the grid system and the recommended markup for the form validation of Bootstrap.



## Previous releases
Refer to the [releases](https://github.com/tallence/core-forms-frontend/releases) section of this repo.

* **Server side rendering**\
Integrating the CoreForms Frontend into an existing theme as CoreMedia Brick:\
server side rendering of the form, client side validation of the user input


---

**That's it. Have fun ;)\
If you have any problems, questions, ideas, critics - please contact us or create an issue. Thanks!**


