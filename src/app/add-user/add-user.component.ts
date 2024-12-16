import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { UserModel } from '../../model/user.model';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
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
      role: new FormControl(0, Validators.required),
      nationalCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      phone: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
  });
  user:UserModel[] = []
  submitted: boolean = false;
  constructor(private userService:UserService, private router: Router){

  }
  ngOnInit(){
    const token = localStorage.getItem('authToken');
    if(!token)
      this.router.navigate(['/login'])
  }
  onSubmit(){
    this.submitted = true;
    if (this.userForm.valid) {
      const newUser: UserModel ={
        firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      role: Number(this.userForm.value.role), 
      nationalCode: this.userForm.value.nationalCode,
      phone: this.userForm.value.phone,
      username: this.userForm.value.username,
      password: this.userForm.value.password,
      }
      console.log('Role Value:', this.userForm.value.role);
      const token: string = localStorage.getItem('authToken') as string;
      console.log(token)
      this.userService.adduser(this.userForm.value,token).subscribe({
        next:(res) => {
          this.router.navigate(['/userlist'])
        },
        error:(err) => {
          console.log('faild', err);
        }
      })
      
    }
  }
  backToListUser(){
    this.router.navigate(['/userlist'])
  }
}
