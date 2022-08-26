import CoreFormsValidationPlugin, {CoreFormsValidationRules} from "../../core-forms-validation";
import FormElementBaseMixin from "./FormElementBaseMixin";

/**
 * this mixin adds all validation related functions to a form field element
 */
const FormElementValidationMixin = {
    mixins: [FormElementBaseMixin],
    data() {
        return {
            validatorRules: {},
            inputDebounceDelay: 150
        }
    },
    methods: {
        addRequiredValidationRule() {
            if (this.field.validator.mandatory) {
                this.addValidationRule("mandatory", CoreFormsValidationRules.REQUIRED, true);
            }
        },
        addCheckboxRequiredValidationRule() {
            if (this.field.validator.mandatory) {
                this.addValidationRule("mandatory", CoreFormsValidationRules.REQUIRED, {allowFalse: false});
            }
        },
        addEmailBasedValidationRules() {
            this.addValidationRule("email", CoreFormsValidationRules.EMAIL, true);
            this.addRequiredValidationRule()
        },
        addArrayBasedValidationRules() {
            if (this.field.validator.minSize != null) {
                this.addValidationRule("minSize", CoreFormsValidationRules.ARRAY_MIN, {
                    min: this.field.validator.minSize,
                    allowEmpty: !this.field.validator.mandatory
                });
            } else {
                if (this.field.validator.mandatory) {
                    this.addValidationRule("mandatory", CoreFormsValidationRules.ARRAY_REQUIRED, true);
                }
            }
            if (this.field.validator.maxSize) {
                this.addValidationRule("maxSize", CoreFormsValidationRules.ARRAY_MAX, {
                    max: this.field.validator.maxSize,
                    allowEmpty: !this.field.validator.mandatory
                });
            }
        },
        addStringBasedValidationRules() {
            this.addRequiredValidationRule();
            if (this.field.validator.minSize) {
                this.addValidationRule("minSize", CoreFormsValidationRules.STRING_MIN, {length: this.field.validator.minSize});
            }
            if (this.field.validator.maxSize) {
                this.addValidationRule("maxSize", CoreFormsValidationRules.STRING_MAX, {length: this.field.validator.maxSize});
            }
            if (this.field.validator.regexp) {
                this.addValidationRule("regexp", CoreFormsValidationRules.REGEX, new RegExp(this.field.validator.regexp));
            }
        },
        addNumberBasedValidationRules() {
            this.addRequiredValidationRule();
            this.addValidationRule("numeric", CoreFormsValidationRules.NUMERIC, true);
            if (this.field.validator.minSize) {
                this.addValidationRule("minSize", CoreFormsValidationRules.MIN_VALUE, {min: this.field.validator.minSize});
            }
            if (this.field.validator.maxSize) {
                this.addValidationRule("maxSize", CoreFormsValidationRules.MAX_VALUE, {max: this.field.validator.maxSize});
            }
        },
        addFileSizeBasedValidationRules() {
            if (this.field.validator.mandatory) {
                this.addValidationRule("mandatory", CoreFormsValidationRules.FILE_REQUIRED, true);
            }
            if (this.field.validator.minSize && this.field.validator.minSize !== 0) {
                this.addValidationRule('minSize', CoreFormsValidationRules.FILE_SIZE_MIN, {size: this.field.validator.minSize});
            }
            if (this.field.validator.maxSize && this.field.validator.maxSize !== 0) {
                this.addValidationRule('maxSize', CoreFormsValidationRules.FILE_SIZE_MAX, {size: this.field.validator.maxSize});
            }
        },
        /**
         * adding separate validation rules to the validator
         * mapping from json definition to vee validate required schema
         *
         * @param sourceName name of the validation rule inside the json definition/form editor
         * @param ruleName name of the validation rules registered in the CoreFormsValidationPlugin
         * @param ruleDefinition validation rule expression in object notation for vee validate
         */
        addValidationRule(sourceName, ruleName, ruleDefinition) {
            this.validatorRules[ruleName] = ruleDefinition;

            let message = CoreFormsValidationPlugin.getDefaultValidationMessage(ruleName);

            //check if a proper validation message is part of the field definition
            let fieldMessages = this.field.validator['errorMessages'];
            if (fieldMessages != null) {
                let messageKey = (fieldMessages[sourceName] != null) ? sourceName : ruleName;
                if (fieldMessages[messageKey] != null) {
                    message = fieldMessages[messageKey];
                }
            }
            CoreFormsValidationPlugin.addValidationMessageForField(this.field.technicalName, this.field.name, ruleName, message)
        },
    }
};

export default FormElementValidationMixin;
