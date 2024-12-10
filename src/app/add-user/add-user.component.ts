import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { UserModel } from '../../model/user.model';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  userForm!: FormGroup;
  user!: UserModel;
  submitted: boolean = false;
  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      role: new FormControl('0', Validators.required),
      nationalCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      phone: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),

    });
  }
  onSubmit(){
    this.submitted = true;
    if (this.userForm.valid) {
      this.user = new UserModel(
        this.userForm.value.firstName,
        this.userForm.value.lastName,
        this.userForm.value.role,
        this.userForm.value.nationalCode,
        this.userForm.value.phone,
        this.userForm.value.username,
        this.userForm.value.password
      );
    }
    console.log(this.user.firstName)
    // else{
    //   alert('لطفا فرم را به درستی پر کنید.')
    // }
  }
}
