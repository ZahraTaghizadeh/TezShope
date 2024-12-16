import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });
  constructor(private authuser: UserService,private router:Router){}

  submitted = false;
  onLogin(){
    this.submitted = true;
    if(this.loginForm.valid){
      const {userName,password} = this.loginForm.value;
      this.authuser.loginUser(userName,password).subscribe({
        next: (res) =>{
          localStorage.setItem('authToken', res.sessionId);
          console.log('Token:', res.sessionId);
          this.router.navigate(['/home']);
        },
        error: (err) =>{
          console.log('error in login', err)
        }
      })
    }
  }
}
