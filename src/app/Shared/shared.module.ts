import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchComponent } from './search/search.component';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    SidebarComponent,
    SearchComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SidebarComponent,
    SearchComponent,
    SearchPipe
  ]
})
export class SharedModule { } 