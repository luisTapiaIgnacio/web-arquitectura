import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';

export interface FaqItem {
  id: number;
  pregunta: string;
  respuesta: string;
  activo: boolean;
  delay: number;
}

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq implements OnInit, AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  faqs: FaqItem[] = [
    {
      id: 1,
      pregunta: '¿Qué tipos de proyectos realizan?',
      respuesta:
        'Realizamos proyectos de arquitectura y construcción para viviendas, locales comerciales, oficinas, remodelaciones, ampliaciones y edificaciones personalizadas, adaptándonos a las necesidades y presupuesto de cada cliente.',
      activo: true,
      delay: 200,
    },
    {
      id: 2,
      pregunta: '¿Cuánto cuesta elaborar un proyecto arquitectónico?',
      respuesta:
        'El costo de un proyecto arquitectónico puede variar según el tamaño, diseño y complejidad de la obra. En promedio, los proyectos residenciales pueden iniciar desde S/ 3,000 hasta más de S/ 20,000. Además, el costo de construcción en Perú suele oscilar entre S/ 1,200 y S/ 5,000 por metro cuadrado, dependiendo de los acabados y materiales utilizados.',
      activo: false,
      delay: 300,
    },
    {
      id: 3,
      pregunta: '¿Cuánto tiempo demora el diseño del proyecto?',
      respuesta:
        'El tiempo de diseño depende del tipo y tamaño del proyecto. En promedio, un proyecto arquitectónico residencial puede demorar entre 2 y 6 semanas, considerando el diseño, planos, revisiones y ajustes solicitados por el cliente.',
      activo: false,
      delay: 400,
    },
    {
      id: 4,
      pregunta: '¿Se encargan de los permisos municipales?',
      respuesta:
        'Sí, brindamos asesoría y apoyo en la gestión de permisos municipales y documentación necesaria para la ejecución del proyecto, asegurando que todo cumpla con las normativas y requisitos establecidos.',
      activo: false,
      delay: 500,
    },
    {
      id: 5,
      pregunta: '¿Gestionan licencias de construcción?',
      respuesta:
        'Sí, apoyamos en la gestión de licencias de construcción y trámites necesarios ante las entidades correspondientes, facilitando el proceso para que el proyecto se desarrolle de manera segura y conforme a la normativa vigente.',
      activo: false,
      delay: 600,
    },
  ];

  toggleFaq(item: FaqItem): void {
    item.activo = !item.activo;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof (window as any)['AOS'] !== 'undefined') {
        (window as any)['AOS'].init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false,
        });
      }
    }
  }
}
