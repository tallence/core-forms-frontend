<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.UsersMail" -->
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
                <input class="form-control"
                       type="email"
                       maxlength="128"
                       id="${self.id}"
                       name="${self.id}"
                ${isMandatory?then("required",'')}/>
            </div>
        </div>
    </div>
    <div class="input-checkbox">
        <div class="row">
            <div class="col">
                <div class="form-check">
                    <input type="checkbox" name="${self.sendCopyName}" id="sendUserMail${self.id}"/>
                    <label for="sendUserMail${self.id}"><@bp.message "cae-form-sendCopyToUser"/></label>
                </div>
            </div>
        </div>
    </div>
</div>