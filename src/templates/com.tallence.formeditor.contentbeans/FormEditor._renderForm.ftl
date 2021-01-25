<#-- @ftlvariable name="self" type="com.tallence.formeditor.contentbeans.FormEditor" -->
<#-- @ftlvariable name="isRouter" type="java.lang.Boolean" -->

<#--<#assign configUrl=cm.getLink(self, 'appconfig', {'source': self})/>-->
<#assign configUrl=cm.getLink(self, 'formEditorConfig')/>

<div id="core-forms-app-${self.contentId}"
     class="core-forms-app"

     <#-- this uses different versions of the app -->
     data-form="vue-sample-app"

     data-app-remote-url="${configUrl}"

     <#if self.isSpamProtectionEnabled() >
       <#assign recaptchaSecret = form.reCaptchaWebsiteSecret() />
       <#if recaptchaSecret?has_content>
          data-app-recaptcha-sitekey="${recaptchaSecret}"
       </#if>
     </#if>

     data-messages-input-file-remove="${cm.getMessage("com.tallence.forms.label.input.file.remove")}"
     data-messages-input-file-empty="${cm.getMessage("com.tallence.forms.label.input.file.empty")}"
     data-messages-input-file-browse="${cm.getMessage("com.tallence.forms.label.input.file.browse")}"
     data-messages-input-option-default="${cm.getMessage("com.tallence.forms.label.input.option.default")}"
     data-messages-input-mandatory="${cm.getMessage("com.tallence.forms.label.input.mandatory")}"
     data-messages-input-close="${cm.getMessage("com.tallence.forms.label.input.close")}"
     data-messages-copy-mail="${cm.getMessage("com.tallence.forms.label.copy.mail")}"

     data-messages-submit-button="${cm.getMessage("com.tallence.forms.label.submit.button")}"
     data-messages-submit-active="${cm.getMessage("com.tallence.forms.label.submit.active")}"

     data-messages-success-page-title="${cm.getMessage("com.tallence.forms.label.success.page.title")}"
     data-messages-success-page-text="${cm.getMessage("com.tallence.forms.label.success.page.text")}"
     data-messages-success-page-button="${cm.getMessage("com.tallence.forms.label.success.page.button")}"

     data-messages-error-global="${cm.getMessage("com.tallence.forms.label.error.global")}"
     data-messages-error-page-title="${cm.getMessage("com.tallence.forms.label.error.page.title")}"
     data-messages-error-page-text="${cm.getMessage("com.tallence.forms.label.error.page.text")}"
     data-messages-error-page-button="${cm.getMessage("com.tallence.forms.label.error.page.button")}">

  <div class="spacer-area">
    <div class="core-forms__spinner"></div>
  </div>
</div>
