<#-- @ftlvariable name="self" type="com.tallence.formeditor.cae.elements.CheckBoxesGroup" -->
<#-- @ftlvariable name="cmpage" type="com.coremedia.blueprint.common.contentbeans.Page" -->

<#assign validator = self.validator />
<#assign isMandatory = self.mandatory />

<div class="form__group">
    <div class="form-checkboxgroup clearfix${isMandatory?then(' mandatory','')}">
        <div class="row">
            <div class="col-10">
                <p class="form-header">${self.name!""}${isMandatory?then(' *','')}</p>
            </div>
            <div class="col-2">
            <@cm.include self=self view="fieldtip"/>
            </div>
        </div>

    <#assign checkBoxes = self.checkBoxes![]/>
    <#assign checkBoxesColumnSize = (checkBoxes?size)/2/>
    <#assign ceilIndex = checkBoxesColumnSize?ceiling/>
    <#assign valueEntered = self.value?has_content/>

        <div class="row">
        <#--render the boxes in two columns-->
        <#--Column 1-->
        <#if checkBoxes?has_content>
            <div class="col-3 input-checkbox">
                <div class="form-check">
                    <#assign end = (ceilIndex < 1)?then(0, ceilIndex-1)/>
                    <#list checkBoxes[0..end] as option>
                    <@cm.include self=self view='renderCheckBox' params={"option": option}/>
                </#list>
                </div>
            </div>
        </#if>

        <#--Column 2-->
        <#if checkBoxes?size gt 1>
            <div class="col-3 input-checkbox">
                <div class="form-check">
                    <#list checkBoxes[ceilIndex..] as option>
                        <@cm.include self=self view='renderCheckBox' params={"option": option}/>
                    </#list>
                </div>
            </div>
        </#if>
        </div>

    </div>
</div>