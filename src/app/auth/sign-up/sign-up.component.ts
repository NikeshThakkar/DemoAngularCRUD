import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  submitted = false;
  imageSrc: string = '';

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService ) { }

  ngOnInit(): void {

    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      profileImg: [{}]
    });
  }

  get signUpFormControl() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    debugger
    console.log(this.signUpForm.value)
    if (this.signUpForm.invalid) {
      return;
    }
    let formdata:any = new FormData();
    formdata.append('firstName', this.signUpForm.get('firstName')?.value);  
    formdata.append('lastName', this.signUpForm.get('lastName')?.value); 
    formdata.append('email', this.signUpForm.get('email')?.value); 
    formdata.append('password', this.signUpForm.get('password')?.value); 
    formdata.append('profileImg', this.signUpForm.get('profileImg')?.value);   
    console.log(formdata, this.signUpForm.value)

     this.authService.userSignUp(formdata).subscribe((res:any) => {
         console.log('ggg',res);
         if(res.success){
          this.toastr.success('user signUp successfully')
           this.router.navigate(['/'])
         }
     });
     this.signUpForm.reset();
    // Form submission logic

  }
   

  onFileChange(event:any){
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
  //  let reader = new FileReader();
  //  reader.onload = ((e:any) =>{
  //       this.imageSrc = e.target.result;
        // this.signUpForm.patchValue({profileImg: this.imageSrc})
  //  }) 
  //  reader.readAsDataURL(event.target.files[0]);
      const [profileImg] = event.target.files;
      reader.readAsDataURL(profileImg);
     
      reader.onload = (e:any) => {
    
        this.imageSrc = reader.result as string;
      
        this.signUpForm.get('profileImg')?.patchValue(event.target.files[0]);
    
      };
    
    }
  }
}
