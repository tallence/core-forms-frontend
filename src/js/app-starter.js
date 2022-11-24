import {CoreFormsEvents} from '../vue/plugins/core-forms';

/**
 * JS Wrapper to attach a new Vue app instance to an existing DOM node
 */
export default class CoreFormsApplication {

    constructor(domNode, appToUse, coreFormsEventCallbackFn) {
        this.node = domNode;
        this.vueInstance = null;

        this.initApp(appToUse).then(() => this.addEventListener(coreFormsEventCallbackFn));
    }

    async initApp(appToUse) {
        const uniqueId = '_' + Math.random().toString(36).substr(2, 9)
        this.node.setAttribute('core-forms-unique-id', uniqueId);

        this.vueInstance = await appToUse.init(`[core-forms-unique-id="${uniqueId}"]`, this.getAppData(), this.getMessages());
    }

    getAppData() {
        return {
            formUrl:        this.node.dataset['appRemoteUrl'],
            recaptchaKey:   this.node.dataset['appRecaptchaSitekey']
        }
    }

    getMessages() {
        return {
            submitButton:       this.node.dataset['messagesSubmitButton'],
            submitActive:       this.node.dataset['messagesSubmitActive'],
            inputClose:         this.node.dataset['messagesInputClose'],
            inputOptionDefault: this.node.dataset['messagesInputOptionDefault'],
            inputFileEmpty:     this.node.dataset['messagesInputFileEmpty'],
            inputFileRemove:    this.node.dataset['messagesInputFileRemove'],
            inputFileBrowse:    this.node.dataset['messagesInputFileBrowse'],
            inputCopyMail:      this.node.dataset['messagesInputCopyMail'],
            inputMandatory:     this.node.dataset['messagesInputMandatory'],
            successPageTitle:   this.node.dataset['messagesSuccessPageTitle'],
            successPageText:    this.node.dataset['messagesSuccessPageText'],
            successPageButton:  this.node.dataset['messagesSuccessPageButton'],
            errorPageTitle:     this.node.dataset['messagesErrorPageTitle'],
            errorPageText:      this.node.dataset['messagesErrorPageText'],
            errorPageButton:    this.node.dataset['messagesErrorPageButton'],
            errorGlobal:        this.node.dataset['messagesErrorGlobal']
        }
    }

    addEventListener(coreFormsEventCallbackFn) {
        if (this.vueInstance != null) {
            if (typeof coreFormsEventCallbackFn == "function") {
                //custom event handler provided, make sure to remove existing event listeners
                this.vueInstance['$off'](CoreFormsEvents.GLOBAL_EVENT);
            }
            this.vueInstance['$on'](CoreFormsEvents.GLOBAL_EVENT, (event) => {
                if (event != null) {

                    //custom event handling
                    if (typeof coreFormsEventCallbackFn == "function") {
                        coreFormsEventCallbackFn(event['trigger'], event['data']);
                        return;
                    }

                    //default event handling
                    switch (event['trigger']) {
                        case CoreFormsEvents.SUBMIT_CONFIRMED:
                            console.log('CoreForms: success confirmed');
                            break;
                        case CoreFormsEvents.APPLICATION_LOADED:
                            console.log('CoreForms: app loaded');
                            break;
                        case CoreFormsEvents.FORM_LOADED:
                            console.log('CoreForms: form loaded');
                            break;
                        case CoreFormsEvents.FORM_FAILED:
                            console.log('CoreForms: form failed');
                            break;
                        case CoreFormsEvents.FORM_SUBMITTED:
                            console.log('CoreForms: form submitted');
                            break;
                        default:
                    }
                }
            });
        }
    }
}

