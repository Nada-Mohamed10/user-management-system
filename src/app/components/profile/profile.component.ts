import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/app/Shared/interface/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
currentUser: Users | null = null;
 constructor(private _authService:AuthService){}
  ngOnInit(): void {
     this._authService.saveUserData();
  const user = this._authService.getUser();
  console.log('Final user data:', user);
  this.currentUser = user;
  }

}
