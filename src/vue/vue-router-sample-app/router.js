import Vue from 'vue';
import Router from 'vue-router';
import FormPage from "./views/FormPage";
import SuccessPage from "./views/SuccessPage";
import ErrorPage from "./views/ErrorPage";

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'form',
        component: FormPage
    }, {
        path: '/form-success',
        name: 'success',
        component: SuccessPage
    }, {
        path: '/form-error',
        name: 'error',
        component: ErrorPage
    }]
})
