import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryService } from './services/add-category.service';
import { CreateSupplyService } from './services/create-supply.service';
import { GetCategoriesService } from './services/category/get-categories.service';
import { FilterCategoryPipe } from '../supply/services/filter/filter-category.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-add-supply',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule, FilterCategoryPipe, NgxPaginationModule],
  templateUrl: './add-supply.component.html',
  styleUrl: './add-supply.component.css'
})
export class AddSupplyComponent implements OnInit {

  //Paginacion y Filter
  p: number = 1;
  searchText: string = '';
  pageSize: number = 5;

  //Arrays
  categories: any[] = []
  supplies: any[] = []

  //
  formSupply: FormGroup;
  isOpenCategories: boolean = false;
  formCategory: FormGroup;
  inputValue: string = '';
  isOpenAddCategories: boolean = false;
  isOpenEliminate: boolean = false;
  categoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private addCategory: AddCategoryService,
    private getCategories: GetCategoriesService,
    private createSupply: CreateSupplyService,
  ){
    this.formCategory = this.fb.group({
      name: ['', Validators.required]
    });

    this.formSupply = this.fb.group({
      buy_price: [null, [Validators.required, Validators.min(1)]],
      id_category: [null, Validators.required],
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void{
    this.getCategories.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data.map((categories, index) => ({
          ...categories,
          index: index + 1,
          isEditing: false
        }))
      },
      (err) => console.error('Error al obtener los insumos', err)
    )
  }

  createSupp(){
    if(this.formSupply.valid){
      const supply = this.formSupply.value;
      console.log(supply)
      this.createSupply.createSupply(supply).subscribe({
        next: () => {
          console.log('Producto agregado exitosamente');
          this.formSupply.reset();
        },
        error: (err) => {
          console.error('Error al agregar el insumo', err)
        }
      })
    }
  }

  createCategory(){
    if(this.formCategory.valid){
      const category = this.formCategory.value;
      console.log(category)
      this.addCategory.createCategory(category).subscribe({
        next: () => {
          console.log('Categoria agregada exitosamente')
          this.formCategory.reset();
          this.getCategory();
        },
        error: (err) => {
          console.log('Error al agregar la categoria', err)
        }
      })
    }
  }

  openCategories(){
    this.isOpenCategories = true
  }

  closeModal(){
    this.isOpenAddCategories = false
    document.body.style.overflow = ''; // Activa el scroll de nuevo

  }

  get totalPages(): number {
    return Math.ceil(this.categories.length / this.pageSize);
  }

  accept(){
    console.log(`Valor ingresado, ${this.inputValue}`)
    this.createCategory();
    this.closeModal();
  }

  openAddCategory(){
    this.isOpenAddCategories = true
    document.body.style.overflow = 'hidden';
  }

  editCategory(category: any){
    category.isEditing = true;
  }

  closeCategories(){
    this.isOpenCategories = false;
    document.body.style.overflow = ''
  }

  updateCategory(category: any){
    console.log("ID de la categoria", category.id, category.name)
    this.getCategories.updateCategory(category.id, category).subscribe(
      (res) => {
        category.isEditing = false;
        console.log('Categoria actualizada correctamente', res)
        this.getCategory()
      },
      (err) => {
        console.error('Error al cargar las categorias', err)
      }
    )
  }

  cancelEdit(category: any){
    category.isEditing = false;
    this.getCategory()
  }

  formatTotal(hola: string){

  }

  openAddCategories(){

  }

  deleteCategoryById(categoryId: number): void{
    if(categoryId){
      this.getCategories.deleteCategory(categoryId).subscribe(
        () => {
          console.log('Insumo eliminado exitosamente');
          this.categories = this.categories.filter(categories => categories.id !== categoryId)
          this.getCategory();
        },
        (err) => {
          console.error("Eror al eliminar la categoria", err)
        }
      )
    }
  }

  acceptDelete(){
    if(this.categoryId !== null){
      this.deleteCategoryById(this.categoryId);
      this.closeDelete();
    } else{
      console.error('El ID del insumo es nulo')
    }
  }

  closeDelete(){
    this.isOpenEliminate = false;
    document.body.style.overflow = ''; // Activa el scroll de nuevo
  }

  deleteCategories(categoryId: number){
    this.isOpenEliminate = true;
    this.categoryId = categoryId
  }


}
