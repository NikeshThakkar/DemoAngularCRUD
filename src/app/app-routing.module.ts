import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
   {path: '', loadChildren: () =>import('./auth/sign-in/sign-in.module').then((module) => module.SignInModule), },
   {path: 'signUp', loadChildren: () =>import('./auth/sign-up/sign-up.module').then((module) => module.SignUpModule), },
   {path: 'user', canActivate: [AuthGuard], loadChildren: () =>import('./user/user.module').then((module) => module.UserModule), },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
