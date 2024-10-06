import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit, Pipe } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormService } from './services/form.service';
import { CommonModule } from '@angular/common';
import { CreateProductService } from './add-product/services/create-product.service';
import { FilterPipe } from '../fact/filter/filter.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { FilterProductsPipe } from './filter/filter-products.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, CommonModule, FormsModule, FilterProductsPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  searchText: string = '';
  createdProduct: any = null;
  productId: number | null = null;
  products: {id: number, name: string, sell_price: number}[] = [];

  constructor(
    private formService: FormService,
    private createProductService: CreateProductService,
  ){}

  ngOnInit(): void {
      this.formService.products$.subscribe(products => {
        this.products = products
      })
      this.getProducts();
  }

  getProducts(): void{
    this.formService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error("Error al obtener los productos", err)
      }
    })
  }

}
