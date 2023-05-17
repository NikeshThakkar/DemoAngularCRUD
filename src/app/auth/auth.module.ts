import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpModule } from './sign-up/sign-up.module';
import { SignInModule } from './sign-in/sign-in.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SignUpModule,
    SignInModule,
  ]
})
export class AuthModule { }
