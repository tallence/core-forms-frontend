<#-- @ftlvariable name="self" type="com.tallence.formeditor.contentbeans.FormEditor" -->

<div class="container">

  <h1>${self.title}</h1>

  <#if self.detailText?has_content>
    <div class="cm-details__text cm-richtext"<@preview.metadata "properties.detailText"/>>
      <@cm.include self=self.detailText!cm.UNDEFINED />
    </div>
  </#if>

  <div class="alert alert-primary">
    ${cm.getMessage("com.tallence.forms.sample.text")}
  </div>

  <div class="card">
    <div class="card-body">
      <@cm.include self=self view="_renderForm" />
    </div>
  </div>
</div>
