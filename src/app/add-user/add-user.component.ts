import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { UserModel } from '../../model/user.model';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  userForm: FormGroup= new FormGroup({
    firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      role: new FormControl('0', Validators.required),
      nationalCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      phone: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
  });
  user:UserModel[] = []
  submitted: boolean = false;
  constructor(private userService:UserService){

  }
  onSubmit(){
    this.submitted = true;
    if (this.userForm.valid) {
      const newUser: UserModel ={
        firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      role: +this.userForm.value.role, 
      nationalCode: this.userForm.value.nationalCode,
      phone: this.userForm.value.phone,
      userName: this.userForm.value.userName,
      password: this.userForm.value.password,
      }
      this.user.push(newUser);
      this.userService.adduser(this.userForm.value).subscribe({
        next:(res) => {
          console.log('success');
        },
        error:(err) => {
          console.log('faild', err);
        }
      })
      console.log('Success',newUser)
    }
    
    // else{
    //   alert('لطفا فرم را به درستی پر کنید.')
    // }
  }
}
