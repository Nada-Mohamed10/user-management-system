import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
 constructor(private _userService:UserService,private toastr:ToastrService) { }
  userform:FormGroup = new FormGroup({
  'firstName':new FormControl('',[Validators.required]),
  'lastName': new FormControl('',[Validators.required]),
  'age': new FormControl('',Validators.required),
  'email': new FormControl('',Validators.required),
  'phone': new FormControl('',[Validators.required, Validators.pattern('^[0-9]{11}$')]),
  'birthDate': new FormControl('',Validators.required),

  });

  login() {
     if(this.userform.valid){
      this._userService.addUser(this.userform.value).subscribe({
        next: (data) => {
          this.toastr.success('User added successfully', 'Success');
          console.log('API Response:', data);
          this.userform.reset();
        },
        error: (error) => {
          this.toastr.error('Error adding user', 'Error');
          console.error('Error adding user:', error);
        }
      });
     }
     else{
      this.toastr.error('Please fill all the fields', 'Error');
     }
  }
}
