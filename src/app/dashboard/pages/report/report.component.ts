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
import { FilterFactPipe } from './services/filter/filter-fact.pipe';
import { DetailBillService } from '../fact/services/detail-bill/detail-bill.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [RouterOutlet ,HttpClientModule, CommonModule, ReactiveFormsModule, NgxPaginationModule, FormsModule, FilterFactPipe],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{

  //Estoy utilizando NgModel para traer del HTML los datos de las variables

  // Variable para almacenar la factura seleccionada
  selectedBill: any = null;

  //Este array recoge los detalles que se han recorrido con un for cuando se traen de
  //la factura que se ha seleccioando, se hace un push y se muestra en el HTML
  selectedDetails: any[] = [];

  //Este sirve para paginar las facturas que se muestran
  p: number = 1;
  pageSize: number = 10;

  //Este modal abre la ventana que muestra si se eliminan o no las facturas
  isOpenModal: boolean = false;

  //Este modal abre la ventana donde aparecen los detalles de la factura
  isOpenDetails: boolean = false;

  //Este sirve para hacer el filtro por fecha
  searchText: string = '';

  //Este product id, recoge el id del producto para ser mostrado en los detalles
  productId: number | null = null;

  //Este tiene el formato del producto para ser procesado
  products: {id: number, name: string, sell_price: number}[] = [];

  //En este bill se traen las facturas para ser recorridas y mostradas con el HTML
  bill: any[] = [];

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private billService: BillService,
    private detailBillService: DetailBillService
  ){
  }

  ngOnInit(): void {
      this.getBills();
      this.getDetails();
  }

  //SECCION FACTURAS ------------------------------------------

  getBills(){
    this.billService.getBill().subscribe({
      next: (data) => {
        console.log(data)
        this.bill = data.map((bill: Bill, index: number) => ({
          ...bill,
          index: index + 1,
        }));
      },
      error: (err) => {
        console.error("Error al obtener las facturas", err)
      }
    })
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

  //FIN SECCION FACTURAS ------------------------------------------

  //SECCION DETALLES ---------------------------------------

  getDetails(): any{
    this.detailBillService.getDetailBill().subscribe({
      next: (res) => {
        console.log("Detalles de la factura: ", res)
      },
      error: (err) => {
        console.error("Error al obtener los detalles", err)
      }
    })
    return this.detailBillService.getDetailBill();
  }

  openDetails(bill: any){
    this.selectedDetails = [];
    this.selectedBill = bill;
    console.log(this.selectedBill.index)

    this.getDetails().subscribe({
      next: (detailsBill: any[]) => {
        // Iteramos sobre los detalles para encontrar el que coincide con el ID seleccionado
        for (let details of detailsBill) {
          if (details.id_bill.id === this.selectedBill.index) {
            this.selectedDetails.push(details);  // Guardamos los detalles que coinciden
          }
        }
      },
      error: (err: any) => {
        console.error("Error al obtener los detalles:", err);
      }
    });
    this.isOpenDetails = true;
  }

  closeDetails(){
    this.isOpenDetails = false;
    document.body.style.overflow = '';
  }

  //FIN SECCION DETALLES ---------------------------------------

  //MODALES Y DEMAS -----------------------------------------------

  formatTotal(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

  //FIN MODALES Y DEMAS -----------------------------------------------

}
