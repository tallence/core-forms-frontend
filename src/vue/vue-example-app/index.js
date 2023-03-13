/*
This is a simple boilerplate app.
You can use this app as the main app, as a starting point for your own app or integrate the core forms plugin into your existing app.
 */

import {createApp} from 'vue'

import CoreFormsExampleApp from './App'
import CoreFormsPlugin from '../plugins/core-forms'

import {EventBus, EventConstants as CoreFormEvents} from '../plugins/core-forms/common/events'
import DatePickerPlugin from '../extensions/date-picker-plugin'

class CoreFormsApplication {

  constructor(selector, { applicationData, messages }, eventCallback) {

    //create app instance
    const app = createApp(CoreFormsExampleApp)

    //register the main plugin (will include validation and messages plugin as well)
    app.use(CoreFormsPlugin, { applicationData, messages })

    //register other custom plugins
    app.use(DatePickerPlugin, { /* possible options to configure the plugin */ })

    //register event callback handler to access the app events outside the vue app
    if (typeof eventCallback == 'function') {
      EventBus.$off(CoreFormEvents.GLOBAL_EVENT)
      EventBus.$on(CoreFormEvents.GLOBAL_EVENT, (event) => {
        eventCallback.call(self, event)
      })
    }

    //mount to dom
    app.mount(selector)

    return this
  }
}

export default CoreFormsApplication
