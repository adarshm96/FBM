import { Injectable } from "@angular/core";
import { FormBuilder, Validators, ValidatorFn, FormControl, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
interface GetControlObj {
    value?: any;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    pattern?: string;
    phone?: boolean
}
@Injectable({
    providedIn: "root"
})
export class FormHelperService {
    constructor(public formBuilder: FormBuilder) { }
    /**
     * This func will return formControl with required True and min and max length set
     * @param Obj minimum length of the textbox validation
     * @returns FormControl
     */
    getFormControls(Obj: GetControlObj): FormControl {
        const validity = [];
        if (Obj.required) {
            validity.push(Validators.required);
        }
        if (Obj.minLength) {
            validity.push(Validators.minLength(Obj.minLength));
        }
        if (Obj.maxLength) {
            validity.push(Validators.minLength(Obj.maxLength));
        }
        if (Obj.email) {
            validity.push(Validators.email);
        }
        if (Obj.pattern) {
            validity.push(Validators.pattern(Obj.pattern));
        }
        if (Obj.phone) {
            validity.push(this.phoneNumber);
        }
        return this.formBuilder.control(Obj.value, validity);
    }
    phoneNumber(countryPhoneCode = '*'): ValidatorFn {
        return Validators.pattern('([+]' + countryPhoneCode + ')?([0-9]{9,12})$');
    }
    formInputError(form: FormGroup, control: string) {
        if (form.controls[control]) {
            const errors = form.controls[control].errors;
            for (const errorName in errors) {
                if (errors[errorName]) {
                    const error = ''
                    switch (errorName) {
                        case 'required':
                            return 'This field is required';
                        case 'minlength':
                            return `Must be at least
                            ${form.controls[control].errors.minlength.requiredLength} characters long.`;
                        case 'maxlength':
                            return `Must be maximum
                                ${form.controls[control].errors.minlength.requiredLength} characters long.`;
                        case 'email':
                            return 'Please enter valid email address';
                        case 'pattern':
                            if (form.controls[control].errors.pattern.requiredPattern === "^[0-9]{10,12}$") {
                                return 'Please enter a valid phone number';
                            } else if (form.controls[control].errors.pattern.requiredPattern === "^[A-Za-z]{4}0[A-Z0-9a-z]{6}$") {
                                return 'Please enter a valid IFSC code';
                            } else {
                                return 'Please enter a valid data';
                            }

                        default:
                            return form.controls[control].errors[errorName];
                    }
                }
            }
            return null;
        }
    }

    carNumberPlateRegex() {
        return '^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$';
    }
    getFormGroup(controlConfig) {
        return this.formBuilder.group(controlConfig);
    }
    getControls(form, name) {
        return form.get(name);
    }
    formLevelValidation(form: FormGroup): ValidationErrors | null {
        if (form.controls.password.value !== form.controls.confirmpassword.value) {
            return { nomatch: true };
        }
        return null;
    }
    customUsername(control: AbstractControl): ValidationErrors | null {
        if (control.value && control.value.length > 3) {
            return { maxLength: true };
        }
        return null;
    }

}
