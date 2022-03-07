import {Router} from "@angular/router";
import {UserLdap} from "../../model/user-ldap";
import {FormBuilder} from "@angular/forms";
import {ConfirmValidParentMacther, passwordsValidator} from "./passwords-validator.directive";

export abstract class LdapDetailComponent {

  user: UserLdap;
  processLoadRunning = false;
  processValidateRunning = false;
  passwordPlaceHolder: string;
  errorMessage = '';
  confirmValidParentMatcher = new ConfirmValidParentMacther();

  userForm = this.fb.group({
    id: [null],
    login: [''],
    nom: [''],
    prenom: [''],
    // groupe de données imbriquées
    passwordGroup: this.fb.group(
      {
      password: [''],
      confirmPassword: ['']
      },
      {validators: passwordsValidator}
    ),
    mail: {value: '', disabled: true}
  })

  protected constructor(
    public addForm: Boolean,
    private fb: FormBuilder,
    private router: Router) {
      this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : '(vide si inchangé)');
  }

  protected onInit(): void {
    // this.getUser();
  }

  private formGetValue(name: string): any {
    return this.userForm.get(name).value;
  }

  goToLdap(): void {
    this.router.navigate(['/users/list']).then();
  }

  isFormValid(): boolean {
    return this.userForm.valid
      && (!this.addForm || this.formGetValue('passwordGroup.password') != '');
  }

  abstract validateForm(): void;

  onSubmitForm(): void {
    this.validateForm();
  }

  updateLogin(): void {
    if (this.addForm) {
      this.userForm.get('login').setValue((this.formGetValue('prenom') + '.'
        + this.formGetValue('nom')).toLowerCase());
      this.updateMail();
    }
  }

  updateMail(): void {
    if (this.addForm) {
      this.userForm.get('mail').setValue(this.formGetValue('login').toLowerCase() + '@domain.com');
    }
  }

  protected copyUserToFormControl(): void {
    this.userForm.get('id').setValue(this.user.id);
    this.userForm.get('login').setValue(this.user.login);
    this.userForm.get('nom').setValue(this.user.nom);
    this.userForm.get('prenom').setValue(this.user.prenom);
    this.userForm.get('mail').setValue(this.user.mail);
    // this.userForm.get('employeNumero').setValue(this.user.employeNumero);
    // this.userForm.get('employeNiveau').setValue(this.user.employeNiveau);
    // this.userForm.get('dateEmbauche').setValue(this.user.dateEmbauche);
    // this.userForm.get('publisherId').setValue(this.user.publisherId);
    // this.userForm.get('active').setValue(this.user.active);
  }

  protected getUserFromFormControl(): UserLdap {
    return {
      id: this.userForm.get('id').value,
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
      mail: this.userForm.get('mail').value,
      employeNumero: 1, //this.userForm.get('employeNumero').value,
      employeNiveau: 1, //this.userForm.get('employeNiveau').value,
      dateEmbauche: '2020-04-24', //this.userForm.get('dateEmbauche').value,
      publisherId: 1, //this.userForm.get('publisherId').value,
      active: true,
      motDePasse: '',
      role: 'ROLE_USER'
    };
  }
}
