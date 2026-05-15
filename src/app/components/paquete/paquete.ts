import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Paquete {
  id: number;
  nombre: string;
  badge: string;        // color del badge: 'gold' | 'silver' | 'platinum'
  imagen: string;
  desdeLabel: string;
  precio: string;
  moneda: string;
  items: string[];
  popular: boolean;
}

@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paquete.html',
  styleUrls: ['./paquete.css']
})
export class Paquetes{

  paquetes: Paquete[] = [
    {
      id: 1,
      nombre: 'SILVER PACK',
      badge: 'silver',
      imagen: 'assets/images/paquete-img1.jpg',
      desdeLabel: 'A PARTIR DE',
      precio: '$ 30',
      moneda: 'USD',
      popular: false,
      items: [
        'Croquis de distribución a escala',
        'Propuesta de fachada a escala',
        'De 0 – 120 m2',
        'Máximo 3 pisos',
      ],
    },
    {
      id: 2,
      nombre: 'GOLD PACK',
      badge: 'gold',
      imagen: 'assets/images/pack-gold.jpg',
      desdeLabel: 'A PARTIR DE',
      precio: '$ 80',
      moneda: 'USD',
      popular: true,
      items: [
        'Planos arquitectónicos completos',
        'Planos estructurales',
        'Instalaciones sanitarias',
        'De 0 – 200 m2',
        'Máximo 5 pisos',
      ],
    },
    {
      id: 3,
      nombre: 'PLATINUM PACK',
      badge: 'platinum',
      imagen: 'assets/images/pack-platinum.jpg',
      desdeLabel: 'A PARTIR DE',
      precio: '$ 150',
      moneda: 'USD',
      popular: false,
      items: [
        'Planos completos + expediente',
        'Instalaciones eléctricas y sanitarias',
        'Render 3D de fachada',
        'Licencia de construcción incluida',
        'Sin límite de m2',
        'Supervisión de obra',
      ],
    },
    {
      id: 4,
      nombre: 'REMODELACIÓN',
      badge: 'silver',
      imagen: 'assets/images/pack-remodel.jpg',
      desdeLabel: 'A PARTIR DE',
      precio: '$ 50',
      moneda: 'USD',
      popular: false,
      items: [
        'Diseño de interiores',
        'Propuesta 3D del espacio',
        'Asesoría de materiales',
        'De 0 – 150 m2',
      ],
    },
    {
      id: 5,
      nombre: 'EXPEDIENTE',
      badge: 'gold',
      imagen: 'assets/images/pack-expediente.jpg',
      desdeLabel: 'A PARTIR DE',
      precio: '$ 120',
      moneda: 'USD',
      popular: false,
      items: [
        'Licencia de funcionamiento',
        'Certificado ITSE – Defensa Civil',
        'Independización de predio',
        'Sub-división de lotes',
        'Gestión completa ante municipio',
      ],
    },
  ];
}