import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../model/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    weight: new FormControl(0, Validators.required)
  });
  submitted: boolean = false;
  productId: string = '' ;
  products: ProductModel[] = []
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
  }
  onSubmit() {
    this.submitted = true;
    if (this.productForm.valid) {
      const newproduct: ProductModel = {
        name: this.productForm.value.name,
        code: this.productForm.value.code,
        weight: this.productForm.value.weight,
        id: this.productId
      }
      const token : string = localStorage.getItem('authToken') as string;
      this.productService.editProduct(newproduct,token).subscribe({
        next: (res) => {
          this.router.navigate(['/productlist'])
        },
        error: (err) => {
          console.log('faild', err);
        }
      })
      console.log('Success', newproduct)
    }
  }
  ngOnInit() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login'])
      return;
    }
    this.productService.getProducts(token).subscribe((d: any) => {
      this.products = Object.keys((d)).map( key => ({key,...d[key]}));
      console.log(this.products)
      this.route.paramMap.subscribe(p => {
        const code = p.get('code');
        if (code) {
          const product = this.products.find(u => u.code = code);
          if (product) {
              this.productId = product.id ? product.id: '';
                this.productForm.patchValue({
                  name: product.name,
                  code: product.code,
                  weight: product.weight,
                  id: product.id
                })
            }

        }

      })
    })
  };
  backToProductList() {
    this.router.navigate(['/productlist'])
  }
}
