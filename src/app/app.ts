import { Component, signal, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from './components/slider/slider';
import { Header } from './components/header/header';
import { Nosotros } from "./components/nosotros/nosotros";
import { Features } from './components/feactures/feactures';
import { Servicios } from "./components/servicios/servicios";
import { Servicios1 } from './components/servicios-1/servicios-1';
import { Paquetes } from './components/paquete/paquete';
import { PaquetesCard } from './components/paquetes/paquetes';
import { Asesoria } from './components/asesoria/asesoria';
import { MasServicios } from './components/mas-servicios/mas-servicios';
import { Portfolio } from './components/portfolio/portfolio';
import { Faq } from './components/faq/faq';
import { Contacto } from './components/contacto/contacto';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SliderComponent, Header, Nosotros, Features, Servicios, Servicios1, Paquetes, PaquetesCard, Asesoria, MasServicios, Portfolio, Faq, Contacto, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('project_webArquitectura');

  showScroll = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.showScroll = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}