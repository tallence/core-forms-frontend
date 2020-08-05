# CoreForms Sample Theme

## VueJS Application
* core forms frontend integration implemented as [_VueJS_](https://github.com/vuejs/vue) plugin.
* dependencies: [_Vuex_](https://github.com/vuejs/vuex), [_VueResource_](https://github.com/pagekit/vue-resource)
* client side validation with error messages and highlighting with [_vee-validate_](https://github.com/logaretm/vee-validate).
* additional plugin for text messages and translations
* additional plugin for new form elements (adding the DatePicker field using [_vue-datetime_](https://github.com/mariomka/vue-datetime))
* (optional) spam protection with Google Recaptcha. 
* markup and styling based on [_Bootstrap 4_](https://github.com/twbs/bootstrap).


#### jQuery Wrapper

The app is wrapped in a simple jQuery plugin.\
The plugin is responsible for reading all data attributes, setting up the application, passing data to the app and/or listening to events provided by the app.

Please refer to the source for more information: ``_THEME_ROOT_/src/js/app-starter.js``

#### Core Forms Plugin

This plugin contains the main logic of the application: loading data, submitting data, rendering of the complete form, client side validation, ...\
You can simply add this plugin to your existing application.

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

Please refer to the sources (``_THEME_ROOT_/src/vue/plugins/core-forms/``) or the complete examples for more details.

#### Core Forms Messages Plugin

It is not necessary to provide multi language translations to the app! Instead we are passing all already translated texts directly to the app.
The CoreFormsMessagePlugin is responsible for storing and providing all texts which are required by the app.
All required texts are part of the generated markup or get loaded directly with the form definition itself.

Please refer to the sources (``_THEME_ROOT_/src/vue/plugins/core-forms-messages/``) or the complete examples for more details.\
This plugin gets added automatically when using the _Core Forms Plugin_.

#### Core Forms Validation Plugin

This plugin is responsible for the client side validation. It holds all the client side validation logic.\
Please refer to the source for more information: **``_THEME_ROOT_/src/vue/plugins/core-forms-validation``**\
This plugin gets added automatically when using the _Core Forms Plugin_.

#### Complete example 1: *Minimal Vue App* 

Please refer to the sources for more information: **``_THEME_ROOT_/src/vue/vue-simple-sample-app/main.js``**

To activate this app, put the following code into your main javascript file ``_THEME_ROOT_/src/js/core-forms-sample.js``:
```javascript
import CoreFormsSimpleSampleApp from '../vue/vue-simple-sample-app/main';
$(function () {
  $('[data-form="vue-sample-app"]').vueSampleApp(CoreFormsSimpleSampleApp);
});
```

If you just want to render the forms, then this is our recommended approach.

#### Complete example 2: *Vue App with Vue Router*

Please refer to the source for more information: **``_THEME_ROOT_/src/vue/vue-router-sample-app/main.js``**

To activate this app, put the following code into your main javascript file ``_THEME_ROOT_/src/js/core-forms-sample.js``:
```javascript
import CoreFormsSimpleSampleApp from '../vue/vue-simple-sample-app/main';
$(function () {
  $('[data-form="vue-sample-app"]').vueSampleApp(CoreFormsSimpleSampleApp);
});
```

Use this example as a base if you want to build a more complex app with different views. 

#### Custom fields

To add custom fields, you can modify the source of the main plugin directly, but the recommended way to add a custom fields is creating a separate Vue plugin.\
An additional plugin for the CoreForms app requires the following steps:
* Register custom validation rules
* Register custom form field component
* Register your custom plugin

As an example we included the DatePicker field as additional plugin: 
``_THEME_ROOT_\src\vue\shared\date-picker-plugin``.


---

That's it. Have fun ;) \
If you have any problems, questions, ideas, critics - please contact us or create an issue. Thanks!




