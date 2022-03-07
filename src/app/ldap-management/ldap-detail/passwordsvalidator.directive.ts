import { FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core/error/error-options";

export const passwordValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  return password && confirmPassword && password.value === confirmPassword.value ?
    null : { passwordValidator: true };

};

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null)
    : boolean {
    return control.parent.invalid && control.touched;
  }
}
