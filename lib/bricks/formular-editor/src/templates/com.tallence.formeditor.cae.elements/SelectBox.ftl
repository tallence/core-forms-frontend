<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.SelectBox" -->
<#-- @ftlvariable name="cmpage" type="com.coremedia.blueprint.common.contentbeans.Page" -->

<#assign validator = self.validator />
<#assign isMandatory = self.mandatory />
<#assign tooltip = self.hint?has_content?then(' tooltip','') />

<div class="form__group">
    <div class="select clearfix${tooltip}">
        <div class="row">

            <div class="col-10">
                <label for="${self.id}">${self.name!""}${isMandatory?then(' *','')}</label>
            </div>
            <div class="col-2">
            <@cm.include self=self view="fieldtip"/>
            </div>
        </div>
        <div class="row">
            <div class="col">
            <#assign options = self.options![]/>

                <select class="select form-control" name="${self.id}"
                        id="${self.id}" ${isMandatory?then("required",'')}>
                    <option value=""><@bp.message "cae-form-select-default"/></option>
                <#list options as option>
                    <#if option.selectedByDefault>selected="selected"</#if>${option.value}</option>
                </#list>
                </select>
            </div>
        </div>
    </div>
</div>