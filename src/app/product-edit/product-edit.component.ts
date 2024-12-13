import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { ProductModel, UserModel } from '../../model/user.model';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {
  productForm: FormGroup = new FormGroup({
    productName: new FormControl('', Validators.required),
    productCode: new FormControl('', Validators.required),
    productWeight: new FormControl(0, Validators.required)
  });
  submitted: boolean = false;
  constructor(private userService:UserService,private route:ActivatedRoute, private router: Router){

  }
  onSubmit(){
    this.submitted = true;
    if (this.productForm.valid) {
      const Product: ProductModel = {
        productName: this.productForm.value.productName,
        productCode: this.productForm.value.productCode,
        productWeight: this.productForm.value.productWeight
      }
      this.userService.editUser(this.productForm.value).subscribe({
        next:(res) => {
          this.router.navigate(['/productlist'])
        },
        error:(err) => {
          console.log('faild', err);
        }
      })
      console.log('Success',Product)
    }
  }
  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      const productcode = p.get('productcode');
      if(productcode)
      {
        this.userService.getUser(String(productcode)).subscribe({
          next:(product: ProductModel) =>{
            this.productForm.patchValue(product)
            this.router.navigate(['prosductlist'])
          },
          error: (err) =>{
          }
        })
        
      }

    })
  };
  backToProductList(){
    this.router.navigate(['/productlist'])
  }
}
