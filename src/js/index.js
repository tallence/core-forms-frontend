/*! Theme core-forms-sample */

import CoreFormsStarter from './core-forms-starter'

((d) => {
  d.querySelectorAll('[data-form="vue-example-app"]').forEach((node) => {
    new CoreFormsStarter(node)
  })
})(document)
