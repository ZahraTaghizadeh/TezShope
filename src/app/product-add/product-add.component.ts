import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductModel, UserModel } from '../../model/user.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent {

  productForm: FormGroup = new FormGroup({
    productName: new FormControl('', Validators.required),
    productCode: new FormControl('', Validators.required),
    productWeight: new FormControl(0, Validators.required)
  });
  submitted: boolean = false;
  constructor(private userService: UserService, private router: Router) {

  }
  onSubmit() {
    this.submitted = true;
    if (this.productForm.valid) {
      const newProduct: ProductModel = {
        productName: this.productForm.value.productName,
        productCode: this.productForm.value.productCode,
        productWeight: this.productForm.value.productWeight
      }
      this.userService.adduser(this.productForm.value).subscribe({
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
