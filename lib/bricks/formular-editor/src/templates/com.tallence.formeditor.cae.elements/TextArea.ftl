<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.TextArea" -->
<#-- @ftlvariable name="cmpage" type="com.coremedia.blueprint.common.contentbeans.Page" -->

<#assign validator = self.validator />
<#assign isMandatory = self.mandatory />

<div class="form__group">
    <div class="textarea-full clearfix">

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
            <#assign rows = self.rows!""/>
            <#assign amountRows = rows?has_content?then(rows, 4)/>
                <textarea class="form-control"
                          :class="{'is-invalid': errors.has('${self.id}') }"
                          maxlength="500"
                          id="${self.id}"
                          name="${self.id}"
                          rows="${amountRows}"
                          <#if isMandatory>v-validate="'required'"</#if>></textarea>
                <small class="error text-danger">
                    Please fill out this field.
                </small>
            </div>
        </div>
    </div>
</div>
