<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.RadioButtonGroup" -->
<#-- @ftlvariable name="option" type="com.tallence.formeditor.cae.elements.ComplexValue" -->

<#assign optionId = (self.id + option.value)?replace(" ", "-")/>
<#assign optionValue = option.value/>
<input type="radio"
       name="${self.id}"
       value="${optionValue}"
       id="${optionId}"
       <#if option.selectedByDefault>checked="checked"</#if>/>
<label class="form-check-label" for="${optionId}">${optionValue}</label>