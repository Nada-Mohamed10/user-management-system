import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/Shared/interface/users';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoUrl?: string;
  dateOfAdmission: Date;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;
  filteredUsers: Users[] = [];
  allUsers:Users[]=[];
   searchTerm: string = '';
   page: number = 1;

  constructor(private _userService:UserService , private toastr: ToastrService , private _searchService:SearchService) { }

  ngOnInit(): void {
    const cached = this._userService.getUsersList();
    if (cached.length > 0) {
      this.allUsers = cached;
      this.filteredUsers = cached;
    } else {
      this.getUsers();
    }

    this._userService.updatedUsersList$.subscribe((updatedUsers) => {
      if (updatedUsers.length > 0) {
        this.allUsers = updatedUsers;
        this.applySearchFilter();
      }
    });

    this._searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term; 
      this.applySearchFilter(); 
    });
  }

  applySearchFilter() {
    const value = this.searchTerm.toLowerCase();
    this.filteredUsers = this.allUsers.filter(user =>
      user.firstName.toLowerCase().includes(value)
    );
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

  loadUsers(): void {
    // TODO: Replace with actual API call
    // This is mock data for demonstration
    this.users = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 890',
        photoUrl: 'assets/default-avatar.png',
        dateOfAdmission: new Date('2024-01-01')
      },
      // Add more mock users as needed
    ];
  }

  onEdit(user: User): void {
    // TODO: Implement edit functionality
    console.log('Edit user:', user);
  }

  onDelete(user: User): void {
    // TODO: Implement delete functionality
    console.log('Delete user:', user);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsers();
    }
  }
}
  