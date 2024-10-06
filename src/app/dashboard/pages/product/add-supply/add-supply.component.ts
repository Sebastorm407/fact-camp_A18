import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryService } from './services/add-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSupplyService } from './services/create-supply.service';

@Component({
  selector: 'app-add-supply',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-supply.component.html',
  styleUrl: './add-supply.component.css'
})
export class AddSupplyComponent implements OnInit {

  formSupply: FormGroup;
  isOpenModal: boolean = false;
  formCategory: FormGroup;
  inputValue: string = '';
  categories: any[] = []

  constructor(
    private fb: FormBuilder,
    private addCategory: AddCategoryService,
    private router: Router,
    private createSupply: CreateSupplyService,
    private route: ActivatedRoute // Inyección de ActivatedRoute

  ){
    this.formCategory = this.fb.group({
      name: ['', Validators.required]
    });

    this.formSupply = this.fb.group({
      buy_price: [null, Validators.required],
      id_category: [null, Validators.required],
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void{
    this.addCategory.getCategory().subscribe(
      (data) => this.categories = data,
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
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err) => {
          console.log('Error al agregar la categoria', err)
        }
      })
    }
  }

  openModal(){
    this.isOpenModal = true
    document.body.style.overflow = 'hidden'; // Desactiva el scroll
  }

  closeModal(){
    this.isOpenModal = false
    document.body.style.overflow = ''; // Activa el scroll de nuevo

  }

  accept(){
    console.log(`Valor ingresado, ${this.inputValue}`)
    this.createCategory();
    this.closeModal();
  }


}
