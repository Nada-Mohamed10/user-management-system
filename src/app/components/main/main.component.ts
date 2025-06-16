import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/Shared/interface/users';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent  implements OnInit {
 
  constructor(private _userService: UserService , private _searchService: SearchService) {}
  ngOnInit(): void {
   this._searchService.searchTerm$.subscribe(term => {
    console.log("Received search value:", term);
  });
  }

  }

  

