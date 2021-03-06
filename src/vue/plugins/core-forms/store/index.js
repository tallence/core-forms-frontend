import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';

const state = {
  formSource: undefined,
  /*status for form loading */
  formLoading: false,
  /* status for form submit */
  formSubmitting: false,
  /* submit progress */
  formProgress: null,
  /* raw form definition */
  formDefinition: null,
  /* formValues */
  formValues: {}
};

export default {
    namespaced: true,
    state: () => (state),
    getters,
    actions,
    mutations
};
