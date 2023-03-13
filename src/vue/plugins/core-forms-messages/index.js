import CoreFormsDefaultMessages from './messages'

const CoreFormsMessagesPlugin = {
  _TRANSLATIONS: CoreFormsDefaultMessages,

  install(app, initialTexts) {

    let self = this

    const _isTranslationAvailableFn = (key) => {
      return (self._TRANSLATIONS[key] != null)
    }
    const _getTranslationFn = (key, params = null) => {
      let message = self._TRANSLATIONS[key] || key
      if (params != null) {
        if (!Array.isArray(params)) {
          params = [params]
        }
        params.forEach((item, index) => {
          message = message.replace(`[[${index}]]`, item)
        })
      }
      return message
    }
    const _addTranslationFn = (key, value) => {
      let newMessage = {}
      newMessage[key] = value
      _addTranslationsFn(newMessage)
    }

    const _addTranslationsFn = (messages) => {
      this._TRANSLATIONS = {...self._TRANSLATIONS, ...messages}
    }

    //init with provided texts
    _addTranslationsFn(initialTexts || {})

    const translationFunctions = {
      $translateMessage: _getTranslationFn,
      $isTranslationAvailable: _isTranslationAvailableFn,
      $addTranslation: _addTranslationFn,
      $addTranslations: _addTranslationsFn
    }

    app.config.globalProperties = {...app.config.globalProperties, ...translationFunctions}
    app.mixin({
      methods: {...translationFunctions}
    });
  }
}

export default CoreFormsMessagesPlugin


