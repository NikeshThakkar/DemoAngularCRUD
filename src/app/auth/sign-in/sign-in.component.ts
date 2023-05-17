import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  submitted = false;
  usersData:any
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, 
    private route: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.signInForm.markAllAsTouched();
    console.log(this.signInForm.value)
    if (this.signInForm.invalid) {
      return;
    }
    this.authService.userSignIn(this.signInForm.value).subscribe((response:any) => {
       console.log(response);
       if(response){

        const { token } = response;
        sessionStorage.setItem('token', JSON.stringify(token));
       this.usersData = response.res;
       this.toastr.success("login successfully");
       this.route.navigate(['/user']);
      }
    });
  }

  get signInFormControl() {
    return this.signInForm.controls;
  }

}
