import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from './services/clients/client.service';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/products/product.service';
import { FilterPipe } from './filter/filter.pipe';
import { EmployeeService } from './services/employee/employee.service';
import { Employee } from './interfaces/employee';

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
  products: {id: number, name: string, sell_price: number}[] = [];
  selectedProduct: any;
  quantity: number = 1;
  total: number = 0;
  addedProducts: {name: string, sell_price: number, quantity: number, total: number}[] = [];
  totalValue: number = 0;
  selectedClientId: string | null = null;
  isFormActive: boolean = false;
  isButtonVisible: boolean = true;
  isClientVisible: boolean = true;
  makeBillProduct: any[] = []
  employees: any[] = [];

  constructor(
    private clientService: ClientService,
    private serviceProduct: ProductService,
    private employeeService: EmployeeService,
  ){}

  ngOnInit(): void {
    this.getClients()
    this.getProduct()
  }

  getClients(): void{
    this.clientService.getClient().subscribe(
      (data) => this.clients = data,
      (err) => console.error('Error al obtener los clientes', err)
    )
  }

  getEmployee(): void{
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

  onElementSelect(event: any){
    this.selectedClient = event.target.value;
    console.log('Elemento seleccionado', this.selectedClient)
  }

  getProduct(): void{
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
    console.log(this.selectedProduct)
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
      this.addedProducts.push(productData);
      this.totalValue += productData.total;
      console.log('Producto agregado', productData);

      this.selectedProduct = null; // Esto hará que el color de la fila vuelva a la normalidad
      this.quantity = 1;
      // Aquí puedes hacer la lógica para enviar los datos a donde necesites
    } else {
      console.error('Selecciona un producto y una cantidad válida');
    }
  }

  makeBill(){
    this.addedProducts.forEach(product => {
      const productTotal = product.sell_price * product.quantity;
      this.totalBill += productTotal;

      this.makeBillProduct.push(product)
    })
    this.getEmployee();
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
