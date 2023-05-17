import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafeUrlPipe } from './safe-url.pipe';

const route = [
  { path: '', component: UserListComponent },
  { path: 'edit-user', component: EditUserComponent}
]

@NgModule({
  declarations: [
    UserListComponent,
    EditUserComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  bootstrap: [UserListComponent]
})
export class UserModule { }
