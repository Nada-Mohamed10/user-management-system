import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../Shared/interface/users';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Users | null = null;
  
  constructor(private http: HttpClient, private router: Router) { }
  
  login(user: Users): Observable<any> {
    return this.http.post<any>("https://dummyjson.com/auth/login", {
      username: user.username,
      password: user.password
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.userData = null;
    this.router.navigateByUrl('/login');
  }

  saveUserData() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userData = decodedToken;
    }
  }
}
