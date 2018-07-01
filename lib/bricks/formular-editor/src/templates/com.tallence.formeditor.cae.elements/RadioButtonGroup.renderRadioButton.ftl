<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.RadioButtonGroup" -->
<#-- @ftlvariable name="option" type="com.tallence.formeditor.cae.elements.ComplexValue" -->

<#assign optionId = (self.id + option.value)?replace(" ", "-")/>
<#assign optionValue = option.value/>
<input type="radio"
       name="${self.technicalName}"
       value="${optionValue}"
       id="${optionId}"
        <#--Needs a model, because only one radioButton of the group is required, not all of them-->
       v-validate="'required'" v-model="model.${self.technicalName}"
       <#if option.selectedByDefault>checked="checked"</#if>/>
<label class="form-check-label" for="${optionId}">${optionValue}</label>