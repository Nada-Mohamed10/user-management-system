import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Users } from '../interface/users';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit , OnChanges{
  @Input() userDataFromOutside: Users | null = null;
  @Input() showButtons: boolean = true;
  formstring: string = 'Add User';
  constructor(private _userService: UserService, private toastr: ToastrService, private router: Router) { }
    ngOnInit(): void {
    const user = history.state.user;
  if (!this.userDataFromOutside && user) {
    this.formstring = 'Update User';

    if (user.birthDate) {
      const date = new Date(user.birthDate);
      const yyyy = date.getFullYear();
      const mm = ('0' + (date.getMonth() + 1)).slice(-2);
      const dd = ('0' + date.getDate()).slice(-2);
      user.birthDate = `${yyyy}-${mm}-${dd}`;
    }

    this.userform.patchValue(user);
  }
   if (!this.userDataFromOutside && !user) {
    this.formstring = 'Add User';
  }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userDataFromOutside'] && this.userDataFromOutside) {
       console.log('Data from profile input:', this.userDataFromOutside);
    this.formstring = 'My Profile';

    const user = { ...this.userDataFromOutside }; 
  console.log('birthDate:', user.birthDate);
console.log('age:', user.age);
console.log('phone:', user.phone);
    if (user.birthDate) {
      const date = new Date(user.birthDate);
      const yyyy = date.getFullYear();
      const mm = ('0' + (date.getMonth() + 1)).slice(-2);
      const dd = ('0' + date.getDate()).slice(-2);
      user.birthDate = `${yyyy}-${mm}-${dd}`;
    }

    this.userform.patchValue(user);
  }
  }

  userform: FormGroup = new FormGroup({
    'id': new FormControl(''),
    'firstName': new FormControl('', [Validators.required]),
    'lastName': new FormControl('', [Validators.required]),
    'age': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'phone': new FormControl('', [Validators.required]),
    'birthDate': new FormControl('', Validators.required),

  });

  login() {
    if (this.userform.valid) {
      const user = this.userform.value;
       const oldUser = history.state.user;
      if (user.id) {
         if (!user.image && oldUser?.image) {
        user.image = oldUser.image;
      }
        this._userService.updateUser(user).subscribe({
          next: () => {
            this.toastr.success('User updated successfully', 'Success');
            this._userService.updateUserInList(user);
            this.userform.reset();
            this.router.navigate(['/users-list']);
            // this._userService.triggerRefreshUsers();
          },
          error: () => {
            this.toastr.error('Error updating user', 'Error');
          }
        });
      } else {
        this._userService.addUser(user).subscribe({
          next: (data) => {
            this.toastr.success('User added successfully', 'Success');
            console.log('API Response:', data);
            this.userform.reset();
            this._userService.triggerRefreshUsers();
          },
          error: (error) => {
            this.toastr.error('Error adding user', 'Error');
            console.error('Error adding user:', error);
          }
        });
      }

    } else {
      this.toastr.error('Please fill all the fields', 'Error');
    }
  }
}
