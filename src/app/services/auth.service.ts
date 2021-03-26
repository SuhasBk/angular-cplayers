import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticateUser(data) {
    return this.http.post<any>('http://localhost:8080/login', data);
  }

  setBearerToken(token, name) {
    localStorage.setItem('bearerToken', token);
    localStorage.setItem('username', name);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  getUserName() {
    return localStorage.getItem('username');
  }

  isUserAuthenticated(token): Promise<boolean> {
    return this.http.post<any>('http://localhost:3000/auth/v1/isAuthenticated', {}, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).toPromise()
      .then(response => {
        return response.isAuthenticated
      }, err => {
        console.log(err.message);
      })
      .catch(err => {
        console.log(err.message);
      });
  }
}
