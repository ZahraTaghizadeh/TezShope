import { Component } from '@angular/core';
import { UserModel } from '../../model/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-user',
  imports: [],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent {
  users: UserModel[] = [];
  constructor(private userService: UserService, private router: Router){}
  ngOnInit() {
    this.userService.getUsers().subscribe((d: any) => this.users = d)
    console.log(this.userService.getUsers())
  }
  editUser(user:UserModel){
    console.log('ویرایش کاربر:', user);
  }
  deleteUser(nationalCode:string){
    console.log('حذف کاربر با شناسه:', nationalCode);
  }
}
