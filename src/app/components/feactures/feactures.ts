import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feactures.html',
  styleUrls: ['./feactures.css']
})
export class Features {

  features = [
    {
      icon: 'bi-patch-check-fill',
      titulo: 'COMPROMISO',
      texto: 'Nos involucramos en cada proyecto como si fuera propio, garantizando resultados de calidad y satisfacción del cliente.'
    },
    {
      icon: 'bi-briefcase-fill',
      titulo: 'PROFESIONALISMO',
      texto: 'Trabajamos con altos estándares técnicos y éticos, ofreciendo soluciones confiables y bien estructuradas.'
    },
    {
      icon: 'bi-award-fill',
      titulo: 'EXPERIENCIA',
      texto: 'Contamos con experiencia en el desarrollo de proyectos, lo que nos permite ofrecer soluciones eficientes y adaptadas a cada necesidad.'
    },
    {
      icon: 'bi-tags-fill',
      titulo: 'PRECIO JUSTO',
      texto: 'Brindamos servicios de calidad a precios accesibles, buscando siempre el equilibrio entre costo y beneficio.'
    }
  ];

}