import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Core/user.service';
import { Users } from 'src/app/Shared/interface/users';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  allUsers:Users[]=[];
   searchTerm: string = '';
 constructor(private _userService:UserService) { }
  ngOnInit(): void {
    this.getUsers();
  }
 getUsers(){
  this._userService.getUsers().subscribe({
    next:(res)=>{
      // console.log(res.users);
      this.allUsers=res.users;
    },
    error:(err)=>{
      console.log(err);
    },
    complete:()=>{
      console.log("complete");
    }
  })
 }
}
