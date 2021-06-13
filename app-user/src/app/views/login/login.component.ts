import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'
import { FormHelperService } from '../../helpers/form.helper';
import { AuthService } from '../../s../../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  formObj: any;
  submitted = false;
  progress = false;
  formerr = '';
  formsuccess = '';

  constructor(
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public formHelper: FormHelperService,
    public auth: AuthService
  ){
    this.formObj = {
      email: this.formHelper.getFormControls({ required: true, email:true }),
      password: this.formHelper.getFormControls({ required: true, minLength: 8 }),
    };
    this.loginForm = this.formHelper.getFormGroup(this.formObj);
  }

  submit(){
    this.submitted = true;
    this.progress = true;
    if (this.loginForm.valid) {
      this.progress = true;
      this.auth.login(this.loginForm.value)
          .then((data)=>{
            setTimeout(() => {
              this.progress = false;
              console.log(data);
              if (data.success) {
                console.log("login");
                localStorage.setItem('tokenUser', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                this.loginForm.reset();
                this.submitted = false;
                this.router.navigate(['/dashboard']);
                this.formsuccess = data.message
              }else {
                this.formerr = data.message
              }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            }, 1000);
          }).catch((err) => {
            this.progress = false;
            if (err !== 0) {
              this.formerr = 'Invalid Email or Password.';
            }
          });
    }else{
      this.progress = false;
    }
  }

  getError(controlName) {
    if (this.submitted) {
      return this.formHelper.formInputError(this.loginForm, controlName);
    }
  }

 }
