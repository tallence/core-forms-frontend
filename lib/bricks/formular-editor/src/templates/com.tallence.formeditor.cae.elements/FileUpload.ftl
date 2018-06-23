<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.FileUpload" -->

<#assign validator = self.validator />
<#assign isMandatory = self.mandatory />

<div class="form__group">
    <div class="input-upload clearfix">
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
                <input class="form-control-file"
                       :class="{'is-invalid': errors.has('${self.id}') }"
                       type="file"
                       name="${self.id}"
                       id="${self.id}"
                       <#if isMandatory>v-validate="'required'"</#if>
                       data-max-file-size="${validator.maxSize}">
                <small class="error text-danger">
                    Please upload a file.
                </small>
            </div>
        </div>
    </div>
</div>