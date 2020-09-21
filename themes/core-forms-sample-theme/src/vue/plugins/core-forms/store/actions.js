import {normalizeFormDefinition, CoreFormsConstants} from "../common/util";
import {EventConstants, EventSender} from "../common/events";
import {FORM_DEFINITION, FORM_LOADING, FORM_PROGRESS, FORM_SOURCE, FORM_SUBMITTING, RESET_FORM_VALUES, SET_FORM_VALUE} from "./types";
import Vue from "vue";

/**
 * fires an ajax request to load the current form definition
 * expects the remote url to be stored in applicationData.remoteUrl
 *
 * @param commit
 * @param loadUrl
 * @returns {Promise<unknown>}
 */
export const loadForm = ({commit}, loadUrl) => {
    commit(FORM_SOURCE, loadUrl);
    return new Promise((resolve, reject) => {
        commit(FORM_LOADING, true);
        commit(RESET_FORM_VALUES);

        const onSuccess = (formData) => {
            commit(FORM_DEFINITION, formData);
            EventSender.send(EventConstants.FORM_LOADED);
            resolve();
        }

        const onFailure = (error) => {
            commit(FORM_DEFINITION, null);
            EventSender.send(EventConstants.FORM_FAILED, error);
            reject(error);
        }

        if (!loadUrl) {
            return onFailure('MISSING_REQUIRED_LOAD_URL')
        }

        Vue.http.get(loadUrl)
            .then(response => {
                let data = normalizeFormDefinition(response.data);
                if (data.error) {
                    return onFailure(data.error);
                }

                onSuccess(data);
            })
            .catch(onFailure)
            .finally(() => {
                commit(FORM_LOADING, false);
            })
    });
}

/**
 * Main method to submit the form data
 *
 * @param commit
 * @param getters
 * @param submitData
 */
export const submitForm = ({commit, getters}, submitData) => {
  return new Promise((resolve, reject) => {
    EventSender.send(EventConstants.FORM_SUBMIT);
    commit(FORM_SUBMITTING, true);
    commit(FORM_PROGRESS, null);

    let url = getters.getFormProperty(CoreFormsConstants.FORM_SUBMIT_URL);
    if (url == null) {
      reject({error: 'MISSING_REQUIRED_SUBMIT_URL'});
      commit(FORM_SUBMITTING, false);
      return;
    }
    Vue.http.post(url, submitData, {
      progress(e) {
        if (e.lengthComputable) {
          commit(FORM_PROGRESS, Math.round(e.loaded / (e.total || 1) * 100));
        }
      }
    })
      .then((response) => {
        EventSender.send(EventConstants.FORM_SUBMITTED);
        commit(FORM_DEFINITION, null);
        commit(RESET_FORM_VALUES);
        resolve((response['body'] || {})['successData']);
      })
      .catch(error => {
        reject((error['body'] || {})['errorData']);
      })
      .finally(() => {
        commit(FORM_SUBMITTING, false);
        commit(FORM_PROGRESS, 0);
      })
  });
}

export const setFormValue = ({commit}, data = {}) => {
    commit(SET_FORM_VALUE, data);
}
