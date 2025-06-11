import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApiResponse, Users } from '../Shared/interface/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getUsers():Observable<UserApiResponse> {
    return this.http.get<UserApiResponse>("https://dummyjson.com/users");
  }

  addUser(user:Users):Observable<Users> {
    return this.http.post<Users>("https://dummyjson.com/users/add",user);
  }
  updateUser(user:Users):Observable<Users> {
    return this.http.put<Users>("https://dummyjson.com/users/",user);
  }
  deleteUser(id:number):Observable<Users> {
    return this.http.delete<Users>("https://dummyjson.com/users/"+id);
  }
}
