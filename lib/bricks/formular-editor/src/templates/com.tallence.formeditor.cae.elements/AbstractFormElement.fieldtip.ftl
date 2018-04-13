<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.AbstractFormElement" -->

<#assign hint = self.hint!""/>
<#if hint?has_content>
    <div class="fieldtip-container">
        <div class="fieldtip" aria-hidden="true" data-fieldtip="${self.hint}">
            <svg class="icon fieldtip__icon">
                <use xlink:href="#info"/>
            </svg>
        </div>
    </div>
</#if>