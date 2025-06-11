import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';
 @Output() searchChanged = new EventEmitter<string>();

onSearchChange() {
  this.searchChanged.emit(this.searchTerm);
}

}
