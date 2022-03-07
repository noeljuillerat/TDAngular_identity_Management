import {FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

export const passwordsValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
  const password = form.get('password');
  const confirmmPassword = form.get('confirmPassword');

  return password && confirmmPassword && password.value === confirmmPassword.value ?
    null : {passwordValidator: true};
}

export class ConfirmValidParentMacther implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.invalid && control.touched;
  }
}
