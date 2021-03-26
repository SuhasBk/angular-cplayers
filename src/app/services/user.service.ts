import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  currentUser: User;
  currentUserSubject: BehaviorSubject<User>;
  
  constructor(private backend: HttpClient, private auth: AuthService) {
    this.currentUserSubject = new BehaviorSubject(null);
    if(this.auth.getUserName()) {
      this.getUserData(this.auth.getUserName()).subscribe(data => {
        let userData = data;
        let loggedInUser = new User(userData['username'], userData['name'], userData['email'], userData['password'], userData['dp'], userData['favorites'], userData['recommendations']);
        this.loginUser(loggedInUser); 
      });
    } else {
      this.currentUser = null;
      this.currentUserSubject = new BehaviorSubject(this.currentUser);
    }
  }

  loginUser(user: User) {
    this.currentUser = user;
    this.currentUserSubject.next(this.currentUser);
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  getUserSubject(): BehaviorSubject<User> {
    return this.currentUserSubject;
  }

  loggedIn(): boolean {
    return this.auth.getUserName() ? true : false;
  }

  logout() {
    localStorage.removeItem('username');
    this.currentUser = null;
    this.currentUserSubject.next(this.currentUser);
  }
  
  updateFavorites(favorites: any[]) {
    this.currentUser.favorites = favorites;
    
    this.backend.post(`http://localhost:8080/api/user/favorites/${this.currentUser.username}`, this.currentUser.favorites, {
      'headers': new HttpHeaders().set('authorization', `Bearer ${this.auth.getBearerToken()}`)
    }).subscribe(data => {
      console.log('updated : ',data);
    });
  }

  updateRecommendations(recommendations: any[]) {
    this.currentUser.recommendations = recommendations;

    this.backend.post(`http://localhost:8080/api/user/recommendations/${this.currentUser.username}`, this.currentUser.recommendations, {
      'headers': new HttpHeaders().set('authorization', `Bearer ${this.auth.getBearerToken()}`)
    }).subscribe(data => {
      console.log('updated : ', data);
    });
  }

  getUserData(username: string) {
    return this.backend.get(`http://localhost:8080/api/user/${username}`, {
      'headers': new HttpHeaders().set('authorization',`Bearer ${this.auth.getBearerToken()}`)
    });
  }

  updateUserDetails(user: User) {
    return this.backend.put(`http://localhost:8080/api/user/${user.username}`, user, {
      'headers': new HttpHeaders().set('authorization', `Bearer ${this.auth.getBearerToken()}`)
    });
  }

  deleteUser(username: string) {
    return this.backend.delete(`http://localhost:8080/api/user/${username}`, {
      'headers': new HttpHeaders().set('authorization', `Bearer ${this.auth.getBearerToken()}`)
    });
  }
}
