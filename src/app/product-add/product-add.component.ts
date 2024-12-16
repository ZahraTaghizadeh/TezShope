import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../model/product.model';

@Component({
  selector: 'app-product-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent {

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    weight: new FormControl(0, Validators.required)
  });
  product:ProductModel[] = []
  submitted: boolean = false;
  constructor(private productService: ProductService, private router: Router) {

  }
  ngOnInit(){
    const token = localStorage.getItem('authToken');
    
    if(!token)
      this.router.navigate(['/login'])
  }
  onSubmit() {
    this.submitted = true;
    if (this.productForm.valid) {
      const newProduct: ProductModel = {
        name: this.productForm.value.name,
        code: this.productForm.value.code,
        weight: this.productForm.value.weight
      }
      const token: string = localStorage.getItem('authToken') as string;
      this.productService.addProduct(this.productForm.value,token).subscribe({
        next: (res) => {
          this.router.navigate(['/productlist'])
        },
        error: (err) => {
          console.log('faild', err);
        }
      })

    }
  }
  backToProductList() {
    this.router.navigate(['/productlist'])
  }
}
