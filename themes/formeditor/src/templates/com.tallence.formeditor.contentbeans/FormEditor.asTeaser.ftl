<#-- @ftlvariable name="self" type="com.tallence.formeditor.contentbeans.FormEditor" -->

<#-- TODO if you use an svg sprite, integrate this svg in it. Otherwise it can be moved to the head. -->
<div style="display: none">
    <#-- used for the hint-icon which might be used for form elements -->
    <svg id="info" viewBox="0 0 490 490" width="100%" height="100%"><path d="M245 490C109.9 490 0 380.1 0 245S109.9 0 245 0s245 109.9 245 245-109.9 245-245 245zm0-428C144.1 62 62 144.1 62 245s82.1 183 183 183 183-82.1 183-183S345.9 62 245 62z"></path><circle cx="241.3" cy="159.2" r="29.1"></circle><path d="M285.1 359.9h-80.2V321h14.7v-66.2h-14.5v-38.9h65.3V321h14.7z"></path></svg>
</div>

<#assign formElements=form.parseFormElements(self)/>
<#assign link=cm.getLink(self, "formEditorSubmit") />

<div id="formeditor-${self.contentId}">
    <form action="${link}" class="form" method="post" enctype="multipart/form-data" v-on:submit.prevent="onSubmit">
        <div class="container">
            <#list formElements as element>
                <@cm.include self=element/>
            </#list>
            <button class="btn btn-primary" type="submit" :disabled="errors.any()">Form submit</button>
        </div>
    </form>
</div>


<#--Vue.js example. TODO use es6 import statements in js-file of the theme or brick and include vue.js in package.json-->

<script src="https://cdn.jsdelivr.net/npm/vee-validate@latest/dist/vee-validate.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>

<script>
    Vue.use(VeeValidate);

    new Vue({
      el: '#formeditor-${self.contentId}',
      data: function () {
        return  {
            model: {
                // create model variables for all elements, in case a more complex validation is required (e.g. radio- and checkBoxGroups)
                <#list formElements as element>
                    element_${element.id}: [],
                </#list>
            }
          }
      },
      methods: {
          onSubmit: function() {
            this.$validator.validateAll().then((valid) => {
                console.debug('form is valid: ', valid);
                if (valid) {
                    document.querySelector('#formeditor-${self.contentId} form').submit();
                }
            }).catch((err) => {
                console.error('errors exist', this.errors)
            });
          }
      }
    });
</script>
