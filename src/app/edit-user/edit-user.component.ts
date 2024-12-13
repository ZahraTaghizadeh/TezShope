import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { UserModel } from '../../model/user.model';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {

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
  constructor(private userService:UserService,private route:ActivatedRoute, private router: Router){

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
      this.userService.editUser(this.userForm.value).subscribe({
        next:(res) => {
          console.log('success');
        },
        error:(err) => {
          console.log('faild', err);
        }
      })
      console.log('Success',newUser)
    }
  }
  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      const nationalCode = p.get('nationalcode');
      if(nationalCode)
      {
        this.userService.getUser(String(nationalCode)).subscribe({
          next:(user: UserModel) =>{
            this.userForm.patchValue(user)
            this.router.navigate(['/userlist'])
          },
          error: (err) =>{
          }
        })
        
      }

    })
    this.userForm.patchValue(this.user);
  };
  backToListUser(){
    this.router.navigate(['/userlist'])
  }
}
