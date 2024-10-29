import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit, Pipe } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormService } from './services/form.service';
import { CommonModule } from '@angular/common';
import { CreateProductService } from './add-product/services/create-product.service';
import { FilterPipe } from '../fact/filter/filter.pipe';
import { FormGroup, FormsModule, NgModel } from '@angular/forms';
import { FilterProductsPipe } from './filter/filter-products.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, CommonModule, FormsModule, FilterProductsPipe, NgxPaginationModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  //Paginacion y Filter
  p: number = 1;
  pageSize: number = 10;
  searchText: string = '';

  //Modal
  isOpenModal: boolean = false;

  //Productos
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

  //SECCION PRODUCTOS ----------------------------------------

  getProducts(): void{
    this.formService.getProducts().subscribe({
      next: (data) => {
        this.products = data.map((product, index) => ({
          ...product,
          index: index + 1
        }));
      },
      error: (err) => {
        console.error("Error al obtener los productos", err)
      }
    })
  }

  updateProduct(product: any){
    console.log("Id del producto", product.id);

    this.createProductService.updateProduct(product.id, product).subscribe(
      (response) => {
        product.isEditing = false;
        console.log('Producto actualizado exitosamente', response)
        this.getProducts()
      },
      (error) => {
        console.error('Error al actualizar el producto', error)
      }
    )
  }

  deleteProductById(productId: number): void {
    if (productId) {
      this.formService.deleteProductbyId(productId).subscribe(
        () => {
          console.log('Producto eliminado exitosamente');
          this.products = this.products.filter(product => product.id !== productId); // Remover el producto del array localmente
        },
        (error) => {
          console.error('Error al eliminar el producto', error);
        }
      );
    }
  }

  editProduct(supply: any) {
    supply.isEditing = true;
  }

  //FIN SECCION PRODUCTOS ----------------------------------------

  //SECCION MODALES Y DEMAS -------------------------------------------

  cancelEdit(supply: any) {
    supply.isEditing = false;
    this.getProducts(); // Restaurar la lista desde la base de datos (opcional)
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.pageSize);
  }

  openModal(productId: number){
    this.isOpenModal = true
    this.productId = productId
    document.body.style.overflow = 'hidden';
  }

  closeModal(){
    this.isOpenModal = false
    document.body.style.overflow = '';
  }

  accept(){
    if (this.productId !== null) {
      this.deleteProductById(this.productId);
      this.closeModal();
    } else {
      console.error('El ID del producto es nulo');
    }
  }

  formatTotal(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  //FIN SECCION MODALES Y DEMAS -------------------------------------------
}
