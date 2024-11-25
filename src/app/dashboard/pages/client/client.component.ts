import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormService } from '../product/services/form.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterProductsPipe } from '../product/filter/filter-products.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { GetClientService } from './services/get-client.service';
import { CityService } from '../graphic/services/cities.service';
import { GenderService } from '../graphic/services/gender.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, HttpClientModule, CommonModule, FormsModule, FilterProductsPipe, NgxPaginationModule],
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
  isOpenClients: boolean = false;
  formClient: FormGroup;

  //Productos
  createdProduct: any = null;
  clientId: number | null = null;
  products: { id: number, name: string, sell_price: number }[] = [];
  clients: any[] = []
  cities: any[] = []
  genders: any[] = []

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private clientService: GetClientService,
    private cityService: CityService,
    private genderService: GenderService,
  ) {
    this.formClient = this.fb.group({
      number_id: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      birthdate: ['2024-01-01', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required],
      id_city: ['', Validators.required],
      id_gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.formService.products$.subscribe(products => {
      this.products = products
    })
    console.log(this.getClients());
    console.log(this.getCities());
    console.log(this.getGender());
  }

  //SECCION EMPLEADOS ----------------------------------------

  getGender(): void {
    this.genderService.getGender().subscribe({
      next: (data) => {
        console.log('Gender', data)
        this.genders = data.map((gender: any, index: any) => ({
          ...gender,
          index: index + 1
        }));
      },
      error: (err) => {
        console.error('Error al obtener los generos');
      }
    })
  }

  getCities(): void {
    this.cityService.getCities().subscribe({
      next: (data) => {
        console.log('Cities', data)
        this.cities = data.map((city: any, index: any) => ({
          ...city,
          index: index + 1
        }));
      },
      error: (err) => {
        console.error('Error al obtener las ciudades')
      }
    })
  }


  getClients(): void {
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
    if (clientId) {
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

  openAddClient(){
    this.isOpenClients = true;
  }

  closeAddClient(){
    this.isOpenClients = false;
    document.body.style.overflow = '';
  }

  openModal(clientId: number) {
    this.isOpenModal = true
    this.clientId = clientId
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isOpenModal = false
    document.body.style.overflow = '';
  }

  accept() {
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

  closeClient() { }

  createClient() {
    if(this.formClient.valid){
      const client = this.formClient.value;
      console.log(client)
      this.clientService.createClient(client).subscribe({
        next: () => {
          console.log('Cliente agregado exitosamente');
          this.formClient.reset();
        },
        error: (err: any) => {
          console.error('Error al agregar el cliente', err)
        }
      })
    }
    this.closeAddClient();
  }

  //FIN SECCION MODALES Y DEMAS -------------------------------------------
}
