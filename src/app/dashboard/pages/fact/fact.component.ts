import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from './services/clients/client.service';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/products/product.service';
import { FilterPipe } from './filter/filter.pipe';
import { EmployeeService } from './services/employee/employee.service';
import { Employee } from './interfaces/employee';
import { Bill } from './interfaces/bill';
import { Client } from './interfaces/client';
import { BillService } from './services/bill/bill.service';
import { DetailBill } from './interfaces/detail-bill';
import { DetailBillService } from './services/detail-bill/detail-bill.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-fact',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule, FilterPipe],
  templateUrl: './fact.component.html',
  styleUrl: './fact.component.css'
})
export class FactComponent implements OnInit {

  totalBill: number = 0;
  clients: any[] = [];
  searchText: any;
  selectedClient: any;
  createdProduct: any = null;
  productId: number | null = null;
  products: { id: number, name: string, sell_price: number }[] = [];
  selectedProduct: any;
  quantity: number = 1;
  total: number = 0;
  addedProducts: { name: string, sell_price: number, quantity: number, total: number }[] = [];
  addedDetails: { amount: number, unit_price: number, id_product: number, id_bill: number}[] = [];
  totalValue: number = 0;
  selectedClientId!: number;
  isFormActive: boolean = false;
  isButtonVisible: boolean = true;
  isClientVisible: boolean = true;
  employees: any[] = [];
  date!: string;
  time!: string;
  selectedEmployeeId: string | null = null;
  detailsBill: any[] = []


  constructor(
    private clientService: ClientService,
    private serviceProduct: ProductService,
    private employeeService: EmployeeService,
    private billService: BillService,
    private detailBillService: DetailBillService
  ) { }

  ngOnInit(): void {
    this.getClients()
    this.getProduct()
  }

  getClients(): void {
    this.clientService.getClient().subscribe(
      (data) => this.clients = data,
      (err) => console.error('Error al obtener los clientes', err)
    )
  }

  getEmployee(): void {
    this.employeeService.getEmployee().subscribe({
      next: (data) => {
        this.employees = data;
        console.log(this.employees)
      },
      error: (err) => {
        console.error('Error al obtener los empleados', err)
      }
    })
  }

  onElementSelect(event: any) {
    this.selectedClient = event.target.value;
    console.log('Elemento seleccionado', this.selectedClient)
  }

  getProduct(): void {
    this.serviceProduct.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error("Error al obtener los productos", err)
      }
    })
  }

  selectItem(product: any) {
    this.selectedProduct = product;
  }

  calculateTotal() {
    if (this.selectedProduct.sell_price && this.quantity > 0) {
      this.total = this.selectedProduct.sell_price * this.quantity;
    } else {
      this.total = 0; // Resetea el total si no hay producto seleccionado o cantidad inválida
    }
  }

  formatTotal(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  addProduct() {
    if (this.selectedProduct && this.quantity > 0) {
      this.calculateTotal()
      const productData = {
        name: this.selectedProduct.name,
        sell_price: this.selectedProduct.sell_price,
        quantity: this.quantity,
        total: this.total
      };

      const detailsData = {
        amount: this.quantity,
        unit_price: this.selectedProduct.sell_price,
        id_product: this.selectedProduct.id,
        id_bill: 0
      }


      this.addedDetails.push(detailsData);
      this.addedProducts.push(productData);
      this.totalValue += productData.total;
      this.selectedProduct = null; // Esto hará que el color de la fila vuelva a la normalidad
      this.quantity = 1;
      // Aquí puedes hacer la lógica para enviar los datos a donde necesites
    } else {
      console.error('Selecciona un producto y una cantidad válida');
    }
  }

  getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);  // Asegurarse de que tenga dos dígitos
    const day = ('0' + now.getDate()).slice(-2);

    // Formato final: YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  // Método para obtener la hora actual en formato 'HH:mm:ss'
  getCurrentTime(): string {
    const now = new Date();
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);

    // Formato final: HH:mm:ss
    return `${hours}:${minutes}:${seconds}`;
  }

  formBill: any = {
    make_date: '', // manteniendo snake_case
    id_client: 0, // manteniendo snake_case
    id_employee: 1,
  };

  createBill() {
    const currentDateTime = this.getCurrentDateTime();
    this.formBill.make_date = currentDateTime;
    this.formBill.id_client = Number(this.formBill.id_client);

    // Crear la factura
    this.billService.createBill(this.formBill).subscribe({
      next: (response) => {
        const facturaId = response.id


        this.addedDetails.forEach((detalles) => {
          detalles.id_bill = facturaId;
          this.detailBillService.createDetailBill(detalles).subscribe({
            next: (res) => {
              console.log('Detalle creado:', res);
            },
            error: (err) => {
              console.error('Error al crear detalles', err);
            }
          })
        })

        // Obtener el último ID de la factura creada y luego crear los detalles
      },
      error: (error) => {
        console.error('Error al crear la factura:', error);
      }
    });
  }



  formDetailBill: DetailBill = {
    amount: this.formBill.quantity,
    unit_price: this.formBill.sell_price,
    id_product: 1,
    id_bill: 0,
  }

  //Aqui hay algo raro
  detailss: any = this.formDetailBill;

  createDetails() {

    this.detailBillService.createDetailBill(this.detailss).subscribe({
      next: (res) => {
        console.log('Detalles creados exitosamente', res)
      },
      error: (err) => {
        console.error('Error al crear los detalles', err)
      }
    })
  }

  getDetailsBill(): any[] {
    for (let details of this.addedProducts)
      this.detailsBill.push(details)
    return this.detailsBill;
  }

  getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // Método para alternar el estado del formulario
  toggleForm() {
    this.isFormActive = !this.isFormActive;
    this.isButtonVisible = false; // Esconder el botón al activarlo
    this.isClientVisible = false;
  }

  // Método que verifica si el formulario debe estar activo
  isFormEnabled() {
    if (this.selectedClientId !== null) {
      this.isButtonVisible = false; // Esconder el botón si hay un cliente seleccionado
    }
    return this.selectedClientId !== null || this.isFormActive;
  }

}
