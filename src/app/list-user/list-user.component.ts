import { Component } from '@angular/core';
import { UserModel } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list-user',
  imports: [RouterModule,CommonModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent {
  users: UserModel[] = [];
  constructor(private userService: UserService, private router: Router){}
  ngOnInit() {
    const token = localStorage.getItem('authToken');
      if(!token )
      {
        this.router.navigate(['/login'])
        return;
      }
    this.userService.getUsers(token).subscribe((d: any) => {this.users = Object.keys((d)).map( key => ({id: key,...d[key]}));
    console.log(this.users);})

  }
  editUser(username:string): void{
    this.router.navigate(['/edituser',username]);
  }
  deleteUser(userId:string){
    const token :string = localStorage.getItem('authToken') as string;
    console.log(userId);
    this.userService.deleteUser(userId,token).subscribe({
      next: (res) => {
        console.log('success delete');
        this.userService.getUsers(token).subscribe((d: any) => {this.users = Object.keys((d)).map( key => ({id: key,...d[key]}))});
      },
      error: (err) => {
        console.log('faild', err);
      }
    })
  }
}
