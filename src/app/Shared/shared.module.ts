import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchComponent } from './search/search.component';
import { SearchPipe } from './pipes/search.pipe';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    SidebarComponent,
    SearchComponent,
    SearchPipe,
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent,
    SearchComponent,
    SearchPipe
  ]
})
export class SharedModule { } 