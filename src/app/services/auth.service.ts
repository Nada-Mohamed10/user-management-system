import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../Shared/interface/users';
import { Observable, switchMap, tap } from 'rxjs';
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
  }).pipe(
    switchMap((res) => {
      localStorage.setItem('token', JSON.stringify(res));
      const decodedToken: any = jwtDecode(res.accessToken);
      const userId = decodedToken.id;

      return this.http.get<Users>(`https://dummyjson.com/users/${userId}`).pipe(
        tap((fullUser) => {
          localStorage.setItem('currentUser', JSON.stringify(fullUser));
          this.userData = fullUser;
        })
      );
    })
  );
}


  logout() {
    localStorage.removeItem('token');
    this.userData = null;
    this.router.navigateByUrl('/login');
  }

  saveUserData() {
    const token = localStorage.getItem('token');
    if (token) {
      this.userData = JSON.parse(token);
    }
  }
   getUser(): Users | null {
    return this.userData;
  }
}
