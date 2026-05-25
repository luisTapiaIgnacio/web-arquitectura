import { Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject, } from '@angular/core';
  import { CommonModule, isPlatformBrowser } from '@angular/common';

  export interface NavLink {
    label: string;
    href: string;
  }
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {

  navLinks: NavLink[] = [
    { label: 'Inicio',    href: '#inicio'    },
 
    { label: 'Nosotros',  href: '#nosotros'  },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Galería',   href: '#galeria'   },
    { label: 'Recursos',  href: '#recursos'  },
    { label: 'Contacto',  href: '#contacto'  },
  ];

  /** Link activo actual */
  activeLink = 'Inicio';

  /** Si el usuario scrolleó (para aplicar backdrop-blur más intenso) */
  isScrolled = false;

  /** Menú móvil abierto/cerrado */
  menuOpen = false;

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  /** Detecta scroll para cambiar la opacidad del fondo */
  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.isScrolled = window.scrollY > 20;
  }

  setActive(label: string): void {
    this.activeLink = label;
    this.menuOpen = false; // cierra el menú móvil al navegar
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

}








