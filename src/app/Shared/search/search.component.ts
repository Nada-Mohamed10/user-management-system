import { Component, EventEmitter, Output } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';

  constructor(private searchService: SearchService) { }

onSearchChange() {
   console.log("Search term from SearchComponent:", this.searchTerm);
    this.searchService.updateSearch(this.searchTerm);
  }

}
