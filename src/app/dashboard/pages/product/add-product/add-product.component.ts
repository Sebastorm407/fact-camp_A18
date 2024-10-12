import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';
import { CreateProductService } from './services/create-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  myForm: FormGroup;
  productId: number | null = null;
  createdProduct: any = null;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private createProductService: CreateProductService,
    private router: Router
  ){
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      sell_price: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(){
    if(this.myForm.valid){
      const product = this.myForm.value;
      console.log(product)
      this.createProductService.createProduct(product).subscribe({
        next: () => {
          console.log(('Producto agregado exitosamente'));
          this.myForm.reset();
          this.router.navigate(['/product'])
        },
        error: (err) => {
          console.log('Error al agregar el producto', err)
        }
      })
    }
  }

  ngOnInit(): void {

  }

}
