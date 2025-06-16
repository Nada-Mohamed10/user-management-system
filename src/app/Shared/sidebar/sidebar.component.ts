import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: any;
  isCollapsed = false;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.saveUserData();
    this.user = this._authService.getUser();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this._authService.logout();
  }
}
