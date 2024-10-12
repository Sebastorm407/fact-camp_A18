import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Supply } from './interfaces/supply/supply';
import { GetSupplyService } from './services/get-supply.service';
import { CommonModule } from '@angular/common';
import { FilterSuppliesPipe } from './services/filter/filter-supplies.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-supply',
  standalone: true,
  imports: [RouterLink, RouterOutlet, HttpClientModule, CommonModule, FilterSuppliesPipe, FormsModule, NgxPaginationModule],
  templateUrl: './supply.component.html',
  styleUrl: './supply.component.css'
})
export class SupplyComponent implements OnInit {

  p: number = 1;
  isOpenModal: boolean = false
  pageSize: number = 10;
  searchText: string = '';
  supplies: Supply[] = []
  categories: any[] = []
  supplyId: number | null = null;

  constructor(
    private getSupplyService: GetSupplyService
  ) { }

  ngOnInit(): void {
    this.getCategory()
    this.getSupply()
  }

  getSupply(): void {
    this.getSupplyService.getSupply().subscribe({
      next: (data) => {
        console.log(data);
        // Añadimos el flag isEditing a cada suministro
        this.supplies = data.map((supply, index) => ({
          ...supply,
          index: index + 1,
          isEditing: false // Inicializamos el flag como false
        }));
      },
      error: (err) => {
        console.error("Error al obtener los insumos", err);
      }
    });
  }

  getCategory(): void {
    this.getSupplyService.getCategory().subscribe(
      (data) => this.categories = data,
      (err) => console.error('Error al obtener los insumos', err)
    )
  }


  editSupply(supply: any) {
    supply.isEditing = true;
  }

  updateSupply(supply: any) {
    console.log("ID del suministro:", supply.id); // Verifica que el ID no sea null

    this.getSupplyService.updateSupply(supply.id, supply).subscribe(
      (response) => {
        supply.isEditing = false; // Deshabilitar el modo de edición tras la actualización
        console.log('Suministro actualizado exitosamente:', response);
        this.getSupply();
      },
      (error) => {
        console.error('Error al actualizar el insumo', error);
      }
    );
  }

  formatTotal(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  deleteSupplyById(supplyId: number): void{
    if(supplyId){
      this.getSupplyService.deleteSupplyById(supplyId).subscribe(
        () => {
          console.log('Insumo elminado exitosamente');
          this.supplies = this.supplies.filter(supplies => supplies.id !== supplyId)
        },
        (error) => {
          console.error('Error al eliminar el insumo')
        }
      )
    }
  }

  // Cancelar la edición y restaurar el estado anterior
  cancelEdit(supply: any) {
    supply.isEditing = false;
    this.getSupply(); // Restaurar la lista desde la base de datos (opcional)
  }

  get totalPages(): number {
    return Math.ceil(this.supplies.length / this.pageSize);
  }

  getIndexSupplies(){
    return this.supplies.map((supply, index) => ({
      ...supply,
      index: index + 1
    }));
  }

  openModal(supplyId: number){
    this.isOpenModal = true
    this.supplyId = supplyId;
    document.body.style.overflow = 'hidden';
  }

  closeModal(){
    this.isOpenModal = false
    document.body.style.overflow = '';
  }

  accept(){
    if(this.supplyId !== null){
      this.deleteSupplyById(this.supplyId);
      this.closeModal();
    } else{
      console.error('El ID del insumo es nulo')
    }
  }

}
