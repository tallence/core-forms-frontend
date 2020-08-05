import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {
    _sendValidationRequest(url, data) {
        return new Promise((resolve, reject) => {
            if (url == null || !url.length) {
                reject({error: 'validation url not provided'});
                return;
            }
            Vue.http.get(url, {params: data}).then((response) => {
                resolve({valid: response.data || false});
            }, (error) => {
                resolve({valid: false, errors: error});
            })
        });
    },
    /**
     * backend validation for email addresses
     *
     * @param email
     * @returns {Promise<unknown>}
     */
    validateEmail(email) {
        let validationMailUrl;
        if (Vue.$coreFormsStore) {
            validationMailUrl = Vue.$coreFormsStore.getters['coreForms/getFormProperty']('mailValidationUrl');
        }

        //if no remote validation url is set, skip remote validation
        if (validationMailUrl == null) {
            return new Promise((resolve) => {
                resolve({valid: true});
            })
        }
        return this._sendValidationRequest(validationMailUrl, {email});
    }
}
