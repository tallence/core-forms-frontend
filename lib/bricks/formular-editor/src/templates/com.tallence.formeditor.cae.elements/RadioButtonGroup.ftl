<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.RadioButtonGroup" -->
<#-- @ftlvariable name="cmpage" type="com.coremedia.blueprint.common.contentbeans.Page" -->

<#assign validator = self.validator />
<#assign isMandatory = self.mandatory />

<div class="form__group">
    <div class="input-radio clearfix${isMandatory?then(' mandatory','')}" :class="{'is-invalid': errors.has('element_${self.id}') }">

        <div class="row">
            <div class="col-10">
                <p class="form-header">${self.name!""}${isMandatory?then(' *','')}</p>
            </div>
            <div class="col-2">
            <@cm.include self=self view="fieldtip"/>
            </div>
        </div>

    <#assign radioButtons = self.radioButtons![]/>
    <#assign radioButtonsColumnSize = (radioButtons?size)/2/>
    <#assign ceilIndex = radioButtonsColumnSize?ceiling/>
    <#assign valueEntered = self.value?has_content/>

        <div class="row">
        <#--render the boxes in two columns-->
        <#--Column 1-->
        <#if radioButtons?has_content>
            <div class="col-3 input-radio">
                <#assign end = (ceilIndex < 1)?then(0,ceilIndex-1)/>
                <#list radioButtons[0..end] as option>
                <@cm.include self=self view='renderRadioButton' params={"option": option}/>
            </#list>
            </div>
        </#if>

        <#--Column 2-->
        <#if radioButtons?size gt 1>
            <div class="col-3 input-radio">
                <#list radioButtons[ceilIndex..] as option>
                    <@cm.include self=self view='renderRadioButton' params={"option": option}/>
                </#list>
            </div>
        </#if>

        </div>
        <small class="error text-danger">
            Bitte eine Option wählen.
        </small>
    </div>
</div>