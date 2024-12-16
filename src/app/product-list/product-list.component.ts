import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { ProductModel } from '../../model/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [RouterModule,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  products: ProductModel[] = [];
  constructor(private productService: ProductService, private router: Router){}
  ngOnInit() {
    const token = localStorage.getItem('authToken');
      if(!token )
      {
        this.router.navigate(['/login'])
        return;
      }
    this.productService.getProducts(token).subscribe((d: any) => {this.products = Object.keys((d)).map( key => ({id: key,...d[key]}));
    console.log(this.products);})
  
  }
  editProduct(productCode:string): void{
    this.router.navigate(['/productedit',productCode]);
  }
  deleteProduct(productId:string){
    const token :string = localStorage.getItem('authToken') as string;
    console.log(productId);
    this.productService.deleteProduct(productId,token).subscribe({
      next: (res) => {
        console.log('success delete');
        this.productService.getProducts(token).subscribe((d: any) => {this.products = Object.keys((d)).map( key => ({id: key,...d[key]}))});
      },
      error: (err) => {
        console.log('faild', err);
      }
    })
  }
}
