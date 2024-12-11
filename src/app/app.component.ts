import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AddUserComponent,ListUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ZatShop';
}
