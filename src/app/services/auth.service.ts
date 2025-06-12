import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../Shared/interface/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  login(user:Users):Observable<Users> {
    return this.http.post<Users>("https://dummyjson.com/auth/login",user);
  }
}
