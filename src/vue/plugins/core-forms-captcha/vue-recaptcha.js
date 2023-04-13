/**
 * based on https://www.npmjs.com/package/vue-recaptcha v1.3.0,
 * slightly modified for CoreForms, working with Vue3
 **/

import {h} from 'vue'

/* helper defer method */
let defer = function defer() {
  let state = false // Resolved or not
  let callbacks = []
  let resolve = function resolve(val) {
    if (state) {
      return
    }
    state = true
    for (let i = 0, len = callbacks.length; i < len; i++) {
      callbacks[i](val)
    }
  }

  let then = function then(cb) {
    if (!state) {
      callbacks.push(cb)
      return
    }
    cb()
  }
  let deferred = {
    resolved: function resolved() {
      return state
    },
    resolve: resolve,
    promise: {
      then: then
    }
  }
  return deferred
}

let ownProp = Object.prototype.hasOwnProperty

if (typeof window !== 'undefined') {

  window.createCoreFormsRecaptcha = window.createCoreFormsRecaptcha || function () {
    let deferred = defer()
    return {
      notify: function notify() {
        deferred.resolve()
      },
      wait: function wait() {
        return deferred.promise
      },
      render: function render(ele, options, cb) {
        this.wait().then(function () {
          cb(window.grecaptcha.render(ele, options))
        })
      },
      reset: function reset(widgetId) {
        if (typeof widgetId === 'undefined') {
          return
        }
        this.assertLoaded()
        this.wait().then(function () {
          return window.grecaptcha.reset(widgetId)
        })
      },
      execute: function execute(widgetId) {
        if (typeof widgetId === 'undefined') {
          return
        }

        this.assertLoaded()
        this.wait().then(function () {
          return window.grecaptcha.execute(widgetId)
        })
      },
      checkRecaptchaLoad: function checkRecaptchaLoad() {
        if (ownProp.call(window, 'grecaptcha') && ownProp.call(window.grecaptcha, 'render')) {
          this.notify()
        }
      },
      assertLoaded: function assertLoaded() {
        if (!deferred.resolved()) {
          throw new Error('ReCAPTCHA has not been loaded')
        }
      }
    }
  }

  window.coreFormsRecaptcha = window.coreFormsRecaptcha || window.createCoreFormsRecaptcha()
  window.coreFormsRecaptchaApiLoaded = window.coreFormsRecaptchaApiLoaded || window.coreFormsRecaptcha.notify
}

/**
 * the vue component
 */
export default {
  name: 'VueRecaptcha',
  emits: ['render', 'expired', 'verify', 'error'],
  inject: {
    recaptchaHost: {
      type: String,
      'default': 'www.recaptcha.net'
    },
    recaptchaSitekey: {
      type: String,
      required: true
    },
    recaptchaLanguage: {
      type: String,
      'default': 'en'
    }
  },
  props: {
    theme: {
      type: String
    },
    badge: {
      type: String
    },
    type: {
      type: String
    },
    size: {
      type: String
    },
    tabindex: {
      type: String
    },
    loadRecaptchaScript: {
      type: Boolean,
      'default': false
    },
    recaptchaScriptId: {
      type: String,
      'default': '__RECAPTCHA_SCRIPT'
    }
  },
  beforeMount: function beforeMount() {
    if (this.loadRecaptchaScript) {
      if (!document.getElementById(this.recaptchaScriptId)) {
        let script = document.createElement('script')
        script.id = this.recaptchaScriptId
        script.src = 'https://' + this.recaptchaHost + '/recaptcha/api.js?onload=coreFormsRecaptchaApiLoaded&render=explicit&hl=' + this.recaptchaLanguage
        script.async = true
        script.defer = true
        document.head.appendChild(script)
      }
    }
  },
  mounted: function mounted() {
    let _this = this

    window.coreFormsRecaptcha.checkRecaptchaLoad()

    let opts = Object.assign({}, this.$props, {
      sitekey: this.recaptchaSitekey,
      callback: this.emitVerify,
      'expired-callback': this.emitExpired,
      'error-callback': this.emitError
    })

    let container = this.$slots['default'] ? this.$el.children[0] : this.$el
    window.coreFormsRecaptcha.render(container, opts, function (id) {
      _this.$widgetId = id
      _this.$emit('render', id)
    })
  },
  methods: {
    reset: function reset() {
      window.coreFormsRecaptcha.reset(this.$widgetId)
    },
    execute: function execute() {
      window.coreFormsRecaptcha.execute(this.$widgetId)
    },
    emitVerify: function emitVerify(response) {
      this.$emit('verify', response)
    },
    emitExpired: function emitExpired() {
      this.$emit('expired')
    },
    emitError: function emitError() {
      this.$emit('error')
    }
  },
  render() {
    return h('div', {}, this.$slots['default'])
  }
}
