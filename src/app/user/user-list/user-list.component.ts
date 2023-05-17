import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  closeResult: string = '';
  editUserForm!: FormGroup;
  editUserObj: any;
  submitted = false;
  imageSrc: string = '';
  UsersData:any
  isToken:boolean = false;
  token: string | undefined
  profileImg: any;
  editUserId: any
  constructor(private router: Router, 
    private modalService: NgbModal, 
    private formBuilder: FormBuilder,
     private userService: UserService,
     private sanitizer: DomSanitizer) { 
      this.token = JSON.parse(sessionStorage.getItem('token') as string);
     }

  ngOnInit(): void {
     this.getUsers();
    if(this.token){
      this.isToken = true;
    }
    this.editUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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

      reader.onload = (e:any) => {
        this.imageSrc = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0])
    }
  }
 
  onUpdateSubmit() {
    this.userService.updateUser(this.editUserId,this.editUserForm.value).subscribe((res:any) => {
         console.log(res,'update');
         if(res){

           this.modalService.dismissAll();
           this.getUsers();
         }
    });
    
  }

   getUsers() {
    this.userService.getAllUsers().subscribe((res:any) => {
        this.UsersData = res.res
    })
   };

   getuserById () {
    this.userService.getUserById(this.editUserId).subscribe((user:any) =>{
         console.log(user);

         this.editUserObj = user.res
         this.editUserForm.get('firstName')?.patchValue(this.editUserObj.firstName);
         this.editUserForm.get('lastName')?.patchValue(this.editUserObj.lastName);
         this.editUserForm.get('email')?.patchValue(this.editUserObj.email);
         this.editUserForm.get('profileImg')?.patchValue(this.editUserObj.profileimg);

    })
 }

   getSantizeUrl(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }

   onSearch() {
      this.UsersData.filter((data:any) => {
          //
      })
   }

  OnEdit(content:any, user:any) {
    this.editUserId = user.dataValues.id;
    console.log(user.dataValues.id)
    this.getuserById();
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
closeModel() {
  this.modalService.dismissAll();
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

logout() {
  sessionStorage.clear();
  this.router.navigate(['/']);
}

}
