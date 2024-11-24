import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { ReportsService } from './services/report/reports.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet ,HttpClientModule, CommonModule, ReactiveFormsModule, NgxPaginationModule, FormsModule, FilterFactPipe],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{

  //Estoy utilizando NgModel para traer del HTML los datos de las variables

  // Variable para almacenar la factura seleccionada
  selectedBill: any = null;
  selectedBillPdf: any = null

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
    private detailBillService: DetailBillService,
    private reportService: ReportsService,
    private http: HttpClient
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

  subtotal: number = 0;
  IVA: number = 0.19;
  total: number = 0;

  openDetails(bill: any) {
    this.selectedDetails = []; // Limpia los detalles seleccionados
    this.selectedBill = bill; // Guarda la factura seleccionada

    this.reportService.getDetails().subscribe({
        next: (detailBill: any) => {
            detailBill.forEach((detail: any) => { // Asegúrate de iterar sobre cada detalle individual
                if (this.selectedBill.id === detail.id_bill.id) { // Compara el id de la factura
                    this.selectedDetails.push(detail); // Agrega el detalle completo al array
                    this.subtotal += detail.unit_price;
                }
            });
            this.total = this.subtotal + (this.subtotal * this.IVA);
        },
        error: (err: any) => {
            console.error("Error al obtener el detalle:", err);
        }
    });

    this.isOpenDetails = true; // Abre la vista de detalles
    return this.selectedBill.id;
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

  selectBill(bill: any) {
    this.selectedBillPdf = bill;  // Asignamos la factura seleccionada
    console.log('Factura seleccionada', this.selectedBillPdf);
  }

  generatePDF(bill: any) {
    if (!this.selectedBillPdf) {
      console.error('No se ha seleccionado ninguna factura');
      return;
    }

    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text('Factura N. ' + this.selectedBillPdf.id, 14, 20);

    // Detalles del Cliente
    doc.setFontSize(12);
    doc.text('Cliente: ' + this.selectedBillPdf.client?.name + ' ' + this.selectedBillPdf.client?.last_name, 14, 30);
    doc.text('ID Cliente: ' + this.selectedBillPdf.client?.number_id, 14, 40);
    doc.text('Dirección: ' + this.selectedBillPdf.client?.address, 14, 50);
    doc.text('Teléfono: ' + this.selectedBillPdf.client?.phone_number, 14, 60);

    // Detalles del Empleado
    doc.text('Empleado: ' + this.selectedBillPdf.employee?.name + ' ' + this.selectedBillPdf.employee?.last_name, 14, 70);
    doc.text('ID Empleado: ' + this.selectedBillPdf.employee?.number_id, 14, 80);

    // Tabla de productos
    let yPosition = 100;
    doc.setFontSize(10);
    doc.text('Cantidad    |    Descripción    |    Precio Unitario    |    Importe', 14, yPosition);
    yPosition += 10;

    // Obtener los detalles de la factura seleccionada
    this.reportService.getDetails().subscribe({
      next: (details: any) => {
        details.forEach((detail: any) => {
          if (detail.id_bill?.id === this.selectedBillPdf.id) {
            // Imprimir los detalles de la factura seleccionada
            doc.text(
              `   ${detail.amount}                ${detail.id_product.name}                ${detail.unit_price}             ${detail.unit_price * detail.amount}`,
              14,
              yPosition
            );
            yPosition += 10;
          }
        });

        // Calcular el subtotal, IVA y total
        let subtotal = details.reduce((sum: number, detail: any) => {
          if (detail.id_bill?.id === this.selectedBillPdf.id) {
            return sum + (detail.unit_price * detail.amount);
          }
          return sum;
        }, 0);

        const IVA = 0.19;  // Supongamos que el IVA es del 19%
        const total = subtotal + (subtotal * IVA);

        // Mostrar subtotal, IVA y total en el PDF
        doc.text(`Subtotal: ${subtotal.toFixed(2)}`, 14, yPosition);
        yPosition += 10;
        doc.text(`IVA (19%): ${(subtotal * IVA).toFixed(2)}`, 14, yPosition);
        yPosition += 10;
        doc.text(`Total: ${total.toFixed(2)}`, 14, yPosition);

        // Guardar el PDF generado
        doc.save('factura_' + this.selectedBillPdf.id + '.pdf');
      },
      error: (err: any) => {
        console.error('Error al obtener los detalles:', err);
      }
    });
  }



}
