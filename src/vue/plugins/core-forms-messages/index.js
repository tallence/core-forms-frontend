import CoreFormsDefaultMessages from "./messages";

/**
 * Simple plugin for translation texts; provides easy access methods
 *
 * @type {{install(*): void, _MESSAGES: {}, addMessages(*): void}}
 */
const CoreFormsMessagesPlugin = {
  _MESSAGES: CoreFormsDefaultMessages,
  install(Vue) {
    let self = this;

    Vue.prototype.$addFormsMessages = function (messages) {
      self._addMessages(messages);
    }
    Vue.prototype.$addFormsMessage = function (key, value) {
      let newMessage = {};
      newMessage[key] = value;
      self._addMessages(newMessage);
    }

    Vue.prototype.$getFormsMessage = function (key) {
      return self._MESSAGES[key] || key
    }

    // Provide easy methods to messages/texts for all components via global mixin
    Vue.mixin({
      methods: {
        getFormsMessage(key) {
          return self._MESSAGES[key] || key
        },
        hasFormsMessage(key) {
          return (self._MESSAGES[key] != null);
        }
      }
    });

    //adding optional filter for easier usage in templates
    Vue.filter('formsMessage', function (value) {
      return self._MESSAGES[value] || value;
    });
  },
  /**
   * use this method to initially pass some data to the plugin
   *
   * @param data
   */
  config(data = CoreFormsDefaultMessages) {
    this._addMessages(data);
  },
  _addMessages(messages) {
    this._MESSAGES = {...this._MESSAGES, ...messages};
  }
};

export default CoreFormsMessagesPlugin;


