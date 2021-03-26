import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/User';
import { RouterService } from '../services/router.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  
  constructor(private userService: UserService, private builder: FormBuilder, private router: RouterService, private snack: MatSnackBar) { 
    this.user = userService.currentUser;
  }

  ngOnInit(){
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.builder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  updateUserProfile(userToUpdate: User){
    userToUpdate.name = this.editForm.get('name').value;
    userToUpdate.email = this.editForm.get('email').value;
    userToUpdate.password = this.editForm.get('password').value;
    
    this.userService.updateUserDetails(userToUpdate).subscribe(data => {
      if(data) {
        alert('Profile updated successfully!');
      }
    });
  }

  deleteUserProfile(userToDelete: string){
    if(confirm(`Are you sure you want to leave us, ${this.user.name}? :(`)){
      this.userService.deleteUser(userToDelete).subscribe(resp => {
        this.userService.logout();
        this.router.routeToStaticView();
        this.snack.open('Account successfully deleted!', 'OK');
      })
    }
  }

}
