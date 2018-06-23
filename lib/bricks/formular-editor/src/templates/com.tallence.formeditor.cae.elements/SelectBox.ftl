<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.SelectBox" -->
<#-- @ftlvariable name="cmpage" type="com.coremedia.blueprint.common.contentbeans.Page" -->

<#assign validator = self.validator />
<#assign isMandatory = self.mandatory />

<div class="form__group">
    <div class="select clearfix">
        <div class="row">

            <div class="col-10">
                <label for="${self.id}">${self.name!""}${isMandatory?then(' *','')}</label>
            </div>
            <div class="col-2">
            <@cm.include self=self view="fieldtip"/>
            </div>
        </div>
        <div class="row">
            <div class="col" :class="{'is-invalid': errors.has('${self.id}') }">

                <select class="select form-control"
                        :class="{'is-invalid': errors.has('${self.id}') }"
                        name="${self.id}"
                        id="${self.id}"
                        <#if isMandatory>v-validate="'required'"</#if>>
                    <option value=""><@bp.message "cae-form-select-default"/></option>
                <#list self.options![] as option>
                    <option
                        value="${option.value}"
                        <#if option.selectedByDefault>selected="selected"</#if>>
                        ${option.value}
                    </option>
                </#list>
                </select>
                <small class="error text-danger">
                    Please select an option.
                </small>
            </div>
        </div>
    </div>
</div>