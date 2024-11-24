import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormService } from '../product/services/form.service';
import { CreateProductService } from '../product/add-product/services/create-product.service';
import { EmployesService } from '../graphic/services/employes.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterProductsPipe } from '../product/filter/filter-products.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { GetClientService } from './services/get-client.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, CommonModule, FormsModule, FilterProductsPipe, NgxPaginationModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
    //Paginacion y Filter
    p: number = 1;
    pageSize: number = 10;
    searchText: string = '';

    //Modal
    isOpenModal: boolean = false;

    //Productos
    createdProduct: any = null;
    clientId: number | null = null;
    products: {id: number, name: string, sell_price: number}[] = [];
    clients: any[] = []

    constructor(
      private formService: FormService,
      private createProductService: CreateProductService,
      private clientService: GetClientService
    ){}

    ngOnInit(): void {
        this.formService.products$.subscribe(products => {
          this.products = products
        })
        console.log(this.getClients());
    }

    //SECCION EMPLEADOS ----------------------------------------

    getClients(): void{
      this.clientService.getClients().subscribe({
        next: (data) => {
          console.log('Clientes', data)
          this.clients = data.map((client: any, index: any) => ({
            ...client,
            index: index + 1
          }));
        },
        error: (err) => {
          console.error('Error al obtener los clientes');
        }
      })
    }

    deleteClientById(clientId: number): void {
      if(clientId){
        this.clientService.deleteClientById(clientId).subscribe(
          () => {
            console.log('Cliente eliminado exitosamente');
            this.clients = this.clients.filter(client => client.id !== clientId);
          },
          (error) => {
            console.error('Error al eliminar el cliente', error);
          }
        )
      }
    }

    //FIN SECCION PRODUCTOS ----------------------------------------

    //SECCION MODALES Y DEMAS -------------------------------------------

    get totalPages(): number {
      return Math.ceil(this.products.length / this.pageSize);
    }

    openModal(clientId: number){
      this.isOpenModal = true
      this.clientId = clientId
      document.body.style.overflow = 'hidden';
    }

    closeModal(){
      this.isOpenModal = false
      document.body.style.overflow = '';
    }

    accept(){
      if (this.clientId !== null) {
        this.deleteClientById(this.clientId);
        this.closeModal();
      } else {
        console.error('El ID del empleado es nulo');
      }
    }

    formatTotal(value: number): string {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    //FIN SECCION MODALES Y DEMAS -------------------------------------------
}
