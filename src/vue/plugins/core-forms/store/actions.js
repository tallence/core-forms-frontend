import {normalizeFormDefinition, CoreFormsConstants} from "../common/util"
import {EventConstants, EventSender} from "../common/events"
import {
  FORM_DEFINITION,
  FORM_LOADING,
  FORM_PROGRESS,
  FORM_SOURCE,
  FORM_SUBMITTING,
  RESET_FORM_VALUES,
  RESET_PAGE,
  SET_FORM_DATA_FOR_PAGE,
  SET_FORM_VALUE,
  SET_NEXT_PAGE,
  SET_PAGE,
  SET_PREV_PAGE
} from "./types"
import axios from 'axios'

/**
 * fires an ajax request to load the current form definition
 * expects the remote url to be stored in applicationData.remoteUrl
 *
 * @param commit
 * @param loadUrl
 * @returns {Promise<unknown>}
 */
export const loadForm = ({commit}, loadUrl) => {
    commit(FORM_SOURCE, loadUrl)
    return new Promise((resolve, reject) => {
        commit(FORM_LOADING, true)
        commit(RESET_FORM_VALUES)
        commit(RESET_PAGE)

        const onSuccess = (formData) => {
            commit(RESET_PAGE)
            commit(FORM_DEFINITION, formData)
            EventSender.send(EventConstants.FORM_LOADED)
            resolve()
        }

        const onFailure = (error) => {
            commit(FORM_DEFINITION, null)
            commit(RESET_PAGE)
            EventSender.send(EventConstants.FORM_FAILED, error)
            reject(error)
        }

        if (!loadUrl) {
            return onFailure('MISSING_REQUIRED_LOAD_URL')
        }

        axios.get(loadUrl)
            .then(response => onSuccess(normalizeFormDefinition(response.data)))
            .catch(onFailure)
            .finally(() => commit(FORM_LOADING, false))
    });
}

export const saveInputAsFormData = ({commit}, formData) => {
  commit(SET_FORM_DATA_FOR_PAGE, formData)
}

/**
 * Main method to submit the form data
 *
 * @param commit
 * @param getters
 * @param submitData
 */
export const submitForm = ({commit, getters}) => {
  return new Promise((resolve, reject) => {
    EventSender.send(EventConstants.FORM_SUBMIT)
    commit(FORM_SUBMITTING, true)
    commit(FORM_PROGRESS, null)

    let url = getters.getFormProperty(CoreFormsConstants.FORM_SUBMIT_URL);
    if (url == null) {
      reject({error: 'MISSING_REQUIRED_SUBMIT_URL'})
      commit(FORM_SUBMITTING, false)
      return
    }
    axios.post(url, getters.getSubmitFormData, {
      onUploadProgress: function(progressEvent) {
          commit(FORM_PROGRESS, Math.round( (progressEvent.loaded * 100) / progressEvent.total ));
      }
    }).then((response) => {
        EventSender.send(EventConstants.FORM_SUBMITTED);
        commit(FORM_DEFINITION, null)
        commit(RESET_FORM_VALUES)
        commit(RESET_PAGE)
        resolve(response.data['successData'])
      })
      .catch(error => {
        reject((error['body'] || {})['errorData'])
      })
      .finally(() => {
        commit(FORM_SUBMITTING, false)
        commit(FORM_PROGRESS, 0)
      })
  });
}

export const setFormValue = ({commit}, data = {}) => {
    commit(SET_FORM_VALUE, data)
}

export const goToPreviousFormPage = ({commit, state}) => {
  commit(SET_PREV_PAGE)
  EventSender.send(EventConstants.WIZARD_PREV_PAGE)
  EventSender.send(EventConstants.WIZARD_NAVIGATION, {data: state.activePageIndex})
}

export const goToNextFormPage = ({commit, state}) => {
  commit(SET_NEXT_PAGE)
  EventSender.send(EventConstants.WIZARD_NEXT_PAGE)
  EventSender.send(EventConstants.WIZARD_NAVIGATION, {data: state.activePageIndex})
}

export const goToFormPage = ({commit, state}, data = 0) => {
  commit(SET_PAGE, data)
  EventSender.send(EventConstants.WIZARD_NAVIGATION, {data: state.activePageIndex})
}
