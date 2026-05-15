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
  imports: [ CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements OnInit{
  items: PortfolioItem[] = [
    { id: 1, titulo: 'App 1',  categoria: 'App', imagen: 'assets/images/portfolio/img1.jpg',  enlace: '#' },
    { id: 2, titulo: 'Web 3',  categoria: 'Web', imagen: 'assets/images/portfolio/img2.jpg',  enlace: '#' },
    { id: 3, titulo: 'App 2',  categoria: 'App', imagen: 'assets/images/portfolio/img3.jpg',  enlace: '#' },
    { id: 4, titulo: 'Card 2', categoria: 'Card', imagen: 'assets/images/portfolio/img4.jpg', enlace: '#' },
    { id: 5, titulo: 'Web 2',  categoria: 'Web', imagen: 'assets/images/portfolio/img5.jpg',  enlace: '#' },
    { id: 6, titulo: 'App 3',  categoria: 'App', imagen: 'assets/images/portfolio/img6.jpg',  enlace: '#' },
    { id: 7, titulo: 'Card 1', categoria: 'Card', imagen: 'assets/images/portfolio/img7.jpg', enlace: '#' },
    { id: 8, titulo: 'Card 3', categoria: 'Card', imagen: 'assets/images/portfolio/img8.jpg', enlace: '#' },
    { id: 9, titulo: 'Web 1',  categoria: 'Web', imagen: 'assets/images/portfolio/img9.jpg',  enlace: '#' },
  ];
 
  ngOnInit(): void {
    if (typeof lightbox !== 'undefined') {
      lightbox.option({
        resizeDuration: 200,
        wrapAround: true,
        albumLabel: 'Imagen %1 de %2',
        disableScrolling: true
      });
    }
  }
}