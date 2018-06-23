<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.CheckBoxesGroup" -->
<#-- @ftlvariable name="option" type="com.tallence.formeditor.cae.elements.ComplexValue" -->
<#-- @ftlvariable name="cmpage" type="com.coremedia.blueprint.common.contentbeans.Page" -->


<#assign optionValue = option.value/>
<#assign optionId = (self.id + option.value)?replace(" ", "-")/>

<input class="form-check-input"
       type="checkbox"
       name="${self.id}"
       value="${option.value}"
       id="${optionId}"
       v-validate="'required'" v-model="model.${self.id}"
       <#if option.selectedByDefault>checked="checked"</#if>
/>
<label class="form-check-label" for="${optionId}">${optionValue}</label>