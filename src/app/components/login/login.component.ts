import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _authService:AuthService, private router:Router, private toastr: ToastrService) { }
  
  loginForm:FormGroup = new FormGroup({
    'username': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  login() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          localStorage.setItem('token', JSON.stringify(data));
          this._authService.saveUserData();
          this.toastr.success('Login successful!', 'Welcome');
          this.router.navigateByUrl('/users-list');
        },

        error: (error) => {
          this.toastr.error('Invalid credentials', 'Login failed');
          console.error('Login error:', error);
        }
      });
    }
  }
}
