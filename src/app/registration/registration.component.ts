import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../model/User';
import { AuthService } from '../services/auth.service';
import { RegistrationService } from '../services/registration.service';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service';

function passwordMatchValidator(form) {
  const password = form.get('password')
  const confirmPassword = form.get('confirmPassword')
  if(password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMatch: true })
  } else {
    confirmPassword.setErrors(null)
  }
  return null
}

function passwordValidator(control){
  if(control.hasError('required'))
    return null;
  if(control.hasError('minlength'))
    return null;

  let hasNumber = /\d/.test(control.value);
  let hasUpper = /[A-Z]/.test(control.value);
  let hasLower = /[a-z]/.test(control.value);
  // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
  const valid = hasNumber && hasUpper && hasLower;
  if (!valid) {
    return { strong: true };
  }
  return null;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  message: string;

  constructor(private builder: FormBuilder, private regService: RegistrationService, private user: UserService, private router: RouterService, private auth: AuthService, private snackbar: MatSnackBar) { }

  ngOnInit(){
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.builder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, passwordValidator, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: passwordMatchValidator
    });
  }

  registerSubmit() {
    
    let form = this.registerForm
    let userData = new User(form.get('username').value, form.get('name').value, form.get('email').value, form.get('password').value, null, [], []);

    this.regService.createNewUser(userData).subscribe(resp => {
      if(resp) {
        console.log('USER CREATED', resp);
        

        let user = {
          'username': resp['username'],
          'password': userData.password
        }

        this.auth.authenticateUser(user).subscribe((response) => {
          this.message = "";
          this.auth.setBearerToken(response['token'], response['username']);

          this.user.getUserData(response['username']).subscribe(data => {
            let userData = data;
    
            let loggedInUser = new User(userData['username'], userData['name'], userData['email'], userData['password'], userData['dp'], userData['favorites'], userData['recommendations']);

            this.user.loginUser(loggedInUser);
            this.snackbar.open("Account successfully created!","Close");
            this.router.routeToDashboard();
          });
      });
    }
  }, err => {
      if(err.status === 409) {
        this.message = "Username already exists! Please choose another one!";
      }
    });

  }
}
