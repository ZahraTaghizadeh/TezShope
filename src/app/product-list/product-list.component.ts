import { Component } from '@angular/core';
import { ProductModel, UserModel } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  products: ProductModel[] = [];
  constructor(private userService: UserService, private router: Router){}
  ngOnInit() {
    this.userService.getUsers().subscribe((d: any) => this.products = d)
    console.log(this.userService.getUsers())
  }
  editUser(productCode:string): void{
    this.router.navigate(['/productedit',productCode]);
  }
  deleteUser(nationalCode:string){
    console.log('حذف کاربر با شناسه:', nationalCode);
  }
}
