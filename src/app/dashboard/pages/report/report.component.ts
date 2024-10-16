import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GetSupplyService } from '../product/supply/services/get-supply.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Supply } from '../product/supply/interfaces/supply/supply';
import { FilterSuppliesPipe } from '../product/supply/services/filter/filter-supplies.pipe';
import { RouterOutlet } from '@angular/router';
import { FormService } from '../product/services/form.service';
import { CreateProductService } from '../product/add-product/services/create-product.service';
import { Bill } from '../fact/interfaces/bill';
import { BillService } from '../fact/services/bill/bill.service';
import { Client } from '../fact/interfaces/client';
import { Employee } from '../fact/interfaces/employee';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [RouterOutlet ,HttpClientModule, CommonModule, ReactiveFormsModule, NgxPaginationModule, FormsModule, FilterSuppliesPipe],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{

  p: number = 1;
  isOpenModal: boolean = false;
  pageSize: number = 10;
  searchText: string = '';
  createdProduct: any = null;
  productId: number | null = null;
  products: {id: number, name: string, sell_price: number}[] = [];
  bill: any[] = [];
  formBill: FormGroup

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private createProductService: CreateProductService,
    private billService: BillService
  ){
    this.formBill = this.fb.group({
      make_date: Date,
      amount: [null, [Validators.required, Validators.min(0)]],
      id_client: ['', Validators.required],
      id_employee: ['', Validators.required]
    })
  }

  ngOnInit(): void {
      this.formService.products$.subscribe(products => {
        this.products = products
      })
      this.getBills();
  }

  getBills(){
    this.billService.getBill().subscribe({
      next: (data) => {
        this.bill = data.map((bill: Bill, index: number) => ({
          ...bill,
          index: index + 1
        }));
      },
      error: (err) => {
        console.error("Error al obtener las facturas", err)
      }
    })
  }

  formatTotal(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }


  updateDetailBill(product: any){

  }

  deleteBillById(productId: number): void {
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

  cancelEdit(supply: any) {
    supply.isEditing = false;
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
      this.deleteBillById(this.productId);
      this.closeModal();
    } else {
      console.error('El ID del producto es nulo');
    }
  }
}
