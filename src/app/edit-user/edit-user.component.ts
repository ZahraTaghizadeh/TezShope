import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../../model/user.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  userId :number =0;
  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    role: new FormControl('0', Validators.required),
    nationalCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    phone: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  users: UserModel[] = [];
  submitted: boolean = false;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {

  }
  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      const newUser: UserModel = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        role: +this.userForm.value.role,
        nationalCode: this.userForm.value.nationalCode,
        phone: this.userForm.value.phone,
        username: this.userForm.value.username,
        password: this.userForm.value.password,
      }
      const token: string = localStorage.getItem('authToken') as string;
      this.userService.editUser(this.userForm.value, token).subscribe({
        next: (res) => {
          console.log('success');
          this.router.navigate(['/userlist'])
        },
        error: (err) => {
          console.log('faild', err);
        }
      })
      console.log('Success', newUser)
    }
  }
  ngOnInit() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login'])
      return;
    }
    this.userService.getUsers(token).subscribe((d: any) => {
      this.users = Object.values(d),
      this.userId = d,
      console.log(this.userId)
      console.log(this.users)
      this.route.paramMap.subscribe(p => {
      
      const username = p.get('username');
      if (username) {
        const user = this.users.find(u => u.username === username)
        console.log(user)
        if (user) {
          this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            nationalCode: user.nationalCode,
            phone: user.phone,
            role: user.role,
            password: user.password
          })
        }

      }
    })
    })
  };
  backToListUser() {
    this.router.navigate(['/userlist'])
  }
}
