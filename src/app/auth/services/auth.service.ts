import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headerOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getUser() {
    return this.http.get(`${this.API_URL}/users`);
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.API_URL}/users`, user, this.headerOption);
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
