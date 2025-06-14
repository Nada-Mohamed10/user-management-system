import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/Shared/interface/users';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  allUsers:Users[]=[];
   searchTerm: string = '';
   page: number = 1;
 constructor(private _userService:UserService , private toastr: ToastrService) { }
  ngOnInit(): void {
  const cached = this._userService.getUsersList();
  if (cached.length > 0) {
    this.allUsers = cached;
  } else {
    this.getUsers();
  }

  this._userService.updatedUsersList$.subscribe((updatedUsers) => {
    if (updatedUsers.length > 0) {
      this.allUsers = updatedUsers;
    }
  });
  }
   
 getUsers(){
  this._userService.getUsers().subscribe({
    next:(res)=>{
     console.log('API Response:', res);
      this.allUsers=res.users;
      this._userService.setUsersList(res.users);

    },
    error:(err)=>{
      console.log(err);
    },
    complete:()=>{
      console.log("complete");
      
    }
  })
 }
 onSearchChanged(term: string) {
  this.searchTerm = term;
  this.page = 1; 
}

deleteUser(id:number){
  if (confirm('Are you sure you want to delete this user?')) {
    this._userService.deleteUser(id).subscribe({
      next: () => {
        this.toastr.success('User deleted successfully');
           this.allUsers = this.allUsers.filter(user => user.id !== id);
        // this._userService.triggerRefreshUsers(); 
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        this.toastr.error('Failed to delete user');
      }
    });
  }
}
}
