import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service';
import { User } from '../model/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;

  constructor(private builder: FormBuilder, private auth: AuthService, private router: RouterService, private user: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(){
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginSubmit() {
    const user = {
      'username': this.loginForm.get('username').value,
      'password': this.loginForm.get('password').value
    }
    
    this.auth.authenticateUser(user).subscribe((response) => {
      this.message = "";
      this.auth.setBearerToken(response['token'], response['username']);

      this.user.getUserData(response['username']).subscribe(data => {
        let userData = data;
        console.log(userData);

        let loggedInUser = new User(userData['username'], userData['name'], userData['email'], userData['password'], userData['dp'], userData['favorites'], userData['recommendations']);

        this.user.loginUser(loggedInUser);
        this.router.routeToDashboard();
        this.openSnackBar(`Welcome back, ${loggedInUser.name}`, "Cool!");
      });

    },
      (error) => {
        if (error.status === 0){
          this.message = 'Start the backend server! xP';
        }
        else if (error.status === 401) {
          this.message = 'Invalid Credentials! Try Again!';
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
