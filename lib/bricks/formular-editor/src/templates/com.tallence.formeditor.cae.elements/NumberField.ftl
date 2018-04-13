<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.NumberField" -->
<#-- @ftlvariable name="cmpage" type="com.coremedia.blueprint.common.contentbeans.Page" -->

<#assign validator = self.validator />
<#assign isMandatory = self.mandatory />

<div class="form__group">
    <div class="input-text clearfix">
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
                <input type="number"
                       class="form-control"
                ${validator.maxSize?has_content?then("max=" + validator.maxSize, "")}
                ${validator.minSize?has_content?then("min=" + validator.minSize, "")}
                       id="${self.id}"
                       value="${self.value!""}"
                       name="${self.id}"
                ${isMandatory?then('required','')}>
            </div>
        </div>
    </div>
</div>