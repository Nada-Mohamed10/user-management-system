import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    return this.http.put<Users>(`https://dummyjson.com/users/${user.id}`, user);
  }
  deleteUser(id:number):Observable<Users> {
    return this.http.delete<Users>("https://dummyjson.com/users/"+id);
  }


  private refreshUsers = new BehaviorSubject<boolean>(false);
 refreshUsers$ = this.refreshUsers.asObservable();
  triggerRefreshUsers() {
  this.refreshUsers.next(true); 
}

private usersList: Users[] = [];

  setUsersList(users: Users[]) {
    this.usersList = users;
  }
    updateUserInList(user: Users) {
    this.usersList = this.usersList.map(u => u.id === user.id ? user : u);
    this.updatedUsersList.next(this.usersList);
  }
   private updatedUsersList = new BehaviorSubject<Users[]>([]);
  updatedUsersList$ = this.updatedUsersList.asObservable();
  getUsersList(): Users[] {
  return this.usersList;

}
}
