import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  createNewUser(data: User) {
    return this.http.post<any>('http://localhost:8080/register', data);
  }
}
