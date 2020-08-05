/*
  Theme core-forms-sample: Main javascript entry point
 */
import $ from 'jquery';
import './app-starter';

/******** EXAMPLE 1: basic vue app without own vuex store and without vue router - minimal setup ********/
import CoreFormsSimpleSampleApp from '../vue/vue-simple-sample-app/main';
$(function () {
  $('[data-form="vue-sample-app"]').vueSampleApp(CoreFormsSimpleSampleApp);
});

/******** EXAMPLE 2: extended vue app with own vuex store and vue router - more complex setup ********/
// import CoreFormsRouterSampleApp from '../vue/vue-router-sample-app/main';
// $(function () {
//   $('[data-form="vue-sample-app"]').vueSampleApp(CoreFormsRouterSampleApp);
// });
