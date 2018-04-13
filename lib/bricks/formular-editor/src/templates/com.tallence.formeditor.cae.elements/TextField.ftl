<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.TextField" -->
<#-- @ftlvariable name="cmpage" type="com.coremedia.blueprint.common.contentbeans.Page" -->

<#assign validator = self.validator />
<#assign isMandatory = self.mandatory />
<#assign hasRegexpValidator = validator.regexp?has_content?then(validator.regexp.pattern()?has_content, false) />

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
                <input type="text"
                       class="form-control"
                ${validator.maxSize?has_content?then("max=" + validator.maxSize, "")}
                ${validator.minSize?has_content?then("min=" + validator.minSize, "")}
                ${hasRegexpValidator?then('pattern=' + validator.regexp.pattern(), '')}
                       id="${self.id}"
                       name="${self.id}"
                       value="${self.value!""}"
                ${isMandatory?then('required','')}>
            </div>
        </div>
    </div>
</div>