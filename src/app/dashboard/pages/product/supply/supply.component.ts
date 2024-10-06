import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Supply } from './interfaces/supply/supply';
import { GetSupplyService } from './services/get-supply.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supply',
  standalone: true,
  imports: [RouterLink, RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './supply.component.html',
  styleUrl: './supply.component.css'
})
export class SupplyComponent implements OnInit{

  supplies: Supply[] = []

  constructor(
    private getSupplyService: GetSupplyService
  ){}

  ngOnInit(): void {
    this.getSupply()
  }

  getSupply(): void{
    this.getSupplyService.getSupply().subscribe({
      next: (data) => {
        console.log(data)
        this.supplies = data;
      },
      error: (err) => {
        console.error("Error al obtener los insumo", err)
      }
    })
  }


}
