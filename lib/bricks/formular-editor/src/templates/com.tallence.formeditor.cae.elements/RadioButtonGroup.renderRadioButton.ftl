<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.RadioButtonGroup" -->
<#-- @ftlvariable name="option" type="com.tallence.formeditor.cae.elements.ComplexValue" -->

<#assign optionId = (self.id + option.value)?replace(" ", "-")/>
<#assign optionValue = option.value/>
<input type="radio"
       name="element_${self.id}"
       value="${optionValue}"
       id="${optionId}"
        <#--Needs a model, because only one radioButton of the group is required, not all of them-->
       v-validate="'required'" v-model="model.element_${self.id}"
       <#if option.selectedByDefault>checked="checked"</#if>/>
<label class="form-check-label" for="${optionId}">${optionValue}</label>