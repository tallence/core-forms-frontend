import {email as veeEmail} from "vee-validate/dist/rules";
import ValidationService from "../service";

/**
 * custom email validation with client and (optional) server side validation
 *
 * @type {{lazy: boolean, validate: email.validate}}
 */
export const email = {
    validate: (value) => {
        if (value != null && value.length) {
            if (veeEmail.validate(value)) {
                return ValidationService.validateEmail(value);
            } else {
                return false;
            }
        }
        return true;
    },
    lazy: true
};
