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
            <div class="col" :class="{'is-invalid': errors.has('element_${self.id}') }">

                <#assign veeValExpr = "size: " + validator.maxSize />
                <#if isMandatory>
                    <#assign veeValExpr = veeValExpr + (veeValExpr?has_content?then(", ", "")) + "required: true" />
                </#if>

                <input class="form-control-file"
                       :class="{'is-invalid': errors.has('element_${self.id}') }"
                       type="file"
                       name="element_${self.id}"
                       id="${self.id}"
                       <#if veeValExpr?has_content>v-validate="{ ${veeValExpr} }"</#if>>
                <small class="error text-danger" v-if="errors.has('element_${self.id}')">
                    Bitte eine Datei hochladen, die maximal ${validator.maxSize}Kb groß ist.
                </small>
            </div>
        </div>
    </div>
</div>