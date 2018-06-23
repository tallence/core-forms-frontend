<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.ConsentFormCheckBox" -->

<#assign validator = self.validator />
<#assign isMandatory = self.mandatory />

<div class="form__group">
    <div class="form-checkboxgroup clearfix${isMandatory?then(' mandatory','')}">
        <div class="row">
            <div class="col-10">
                <p class="form-header">${self.name!""}${isMandatory?then(' *','')}</p>
            </div>
        </div>

        <div class="row">
            <div class="input-checkbox">
                <div class="form-check" :class="{'is-invalid': errors.has('element_${self.id}') }">
                    <input class="form-check-input"
                           type="checkbox"
                           name="element_${self.id}"
                           <#if isMandatory>v-validate="'required'"</#if>
                           id="${self.id}"/>
                    <label class="form-check-label" for="${self.id}">

                        <#-- if the hint contains an expected expression (%[^%]+%) and the linkTarget is not
                            empty: replace the expression with an anchor-tag. Simply print the unchanged hint otherwise.-->
                        <#if self.linkTarget?has_content && self.hint?matches(".*%[^%]+%.*", "r")>
                            ${self.hint?replace("%([^%]+)%",
                            "<a href='" + cm.getLink(self.linkTarget) + "' title='$1'>$1</a>",
                            "r")?no_esc}
                        <#else>
                            ${self.hint!""}
                        </#if>

                    </label>
                    <small class="error text-danger">
                        Bitte per Checkbox bestätigen.
                    </small>
                </div>
            </div>

        </div>

    </div>
</div>