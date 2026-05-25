import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

declare var lightbox: any;

export interface PortfolioItem {
  id: number;
  titulo: string;
  categoria: string;
  imagen: string;
  enlace: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements OnInit {
  items: PortfolioItem[] = [
    {
      id: 1,
      titulo: 'CASA LUZ',
      categoria: 'Cajamarca - 2025',
      imagen: 'assets/images/portfolio/gal1.jpg',
      enlace: '#',
    },
    {
      id: 2,
      titulo: 'CASA GONZALES',
      categoria: 'Juliaca - 2026',
      imagen: 'assets/images/portfolio/gal2.jpg',
      enlace: '#',
    },
    {
      id: 3,
      titulo: 'CASA SOLANO',
      categoria: 'La Merced - 2024',
      imagen: 'assets/images/portfolio/gal3.jpg',
      enlace: '#',
    },
    {
      id: 4,
      titulo: 'Proyecto unifamilar',
      categoria: 'Acraquia - 2025',
      imagen: 'assets/images/portfolio/gal10.jpg',
      enlace: '#',
    },
    {
      id: 5,
      titulo: 'Circuito Turistico',
      categoria: 'Nuevo Lurin',
      imagen: 'assets/images/portfolio/gal5.jpg',
      enlace: '#',
    },
    {
      id: 6,
      titulo: 'Circuito Turistico',
      categoria: 'Nuevo Lurin - 2018',
      imagen: 'assets/images/portfolio/gal6.jpg',
      enlace: '#',
    },
    {
      id: 7,
      titulo: 'CASA DIAZ',
      categoria: 'VISTA 3D DE FACHADA PRINCIPA',
      imagen: 'assets/images/portfolio/gal7.jpg',
      enlace: '#',
    },
    {
      id: 8,
      titulo: 'Proyecto Ampliacion',
      categoria: 'Acraquia - 2023',
      imagen: 'assets/images/portfolio/gal8.jpg',
      enlace: '#',
    },
    {
      id: 9,
      titulo: 'Proyecto multifamiliar',
      categoria: 'Ventanilla - 2026',
      imagen: 'assets/images/portfolio/gal9.jpg',
      enlace: '#',
    },
    {
      id: 9,
      titulo: 'Proyecto Remodelacion',
      categoria: 'Pampas - 2025',
      imagen: 'assets/images/portfolio/gal11.jpg',
      enlace: '#',
    },
  ];

  ngOnInit(): void {
    if (typeof lightbox !== 'undefined') {
      lightbox.option({
        resizeDuration: 200,
        wrapAround: true,
        albumLabel: 'Imagen %1 de %2',
        disableScrolling: true,
      });
    }
  }
}
