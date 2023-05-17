import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;
  submitted = false;
  imageSrc: string = '';
  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {

    this.editUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profileImg: ['']
    });
  }
  get editUserFormControl() {
    return this.editUserForm.controls;
  }

  onSubmit() {
    console.log(this.editUserForm.value)
    if (this.editUserForm.invalid) {
      return;
    }
    //  this.authService.userSignUp(this.signUpForm.value).subscribe((res:any) => {
    //      console.log('ggg',res);
    //  })
    // Form submission logic
  }

  onFileChange(event:any){
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [profileImg] = event.target.files;
      reader.readAsDataURL(profileImg);
     
      reader.onload = () => {
    
        this.imageSrc = reader.result as string;
      
        this.editUserForm.patchValue({
          fileSource: reader.result
        });
    
      };
    
    }
  }

  
}
