import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
