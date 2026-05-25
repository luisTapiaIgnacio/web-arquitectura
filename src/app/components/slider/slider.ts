import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  NgZone,
  HostListener,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

// gsap se carga desde CDN en index.html — solo existe en el browser
declare const gsap: any;

export interface SlideData {
  place: string;
  title: string;
  title2: string;
  title3: string;

  description: string;
  image: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.html',
  styleUrls: ['./slider.css'],
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy {
  // ── Datos de los slides ──────────────────────────────────────────────
  data: SlideData[] = [
    {
      place: '',
      title: 'COSTOS Y PRESUPUESTOS',
      title2: 'DE OBRAS - METRADOS',
      title3: '',
      description:
        'Desarrollamos presupuestos y metrados detallados para proyectos de construcción, permitiendo conocer de manera clara los costos, materiales y recursos.',
      image: 'assets/images/arqui-1.jpg',
    },
    {
      place: '',
      title: 'DISEÑO, AMPLIACION',
      title2: ' Y REMODELACIONES',
      title3: '',
      description:
        'Transformamos y renovamos espacios mediante diseños modernos y remodelaciones de calidad, creando ambientes cómodos, elegantes y funcionales para viviendas, oficinas y negocios.',
      image: 'assets/images/arqui-2.jpg',
    },
    {
      place: '',
      title: 'ELABORACIÓN DE',
      title2: 'PLANOS Y EXPEDIENTES',
      title3: '',
      description:
        'ARQUITECTONICOS - ESTRUCTURALES - INSTALACIONES SANITARIAS - INSTALACIONES ELECTRICAS - UBICACIÓN Y LOCALIZACIÓN - SEÑALIZACIÓN Y EVACUACIÓN',
      image: 'assets/images/arqui-3.jpg',
    },
    {
      place: '',
      title: 'EJECUCIÓN DE PROYECTOS',
      title2: 'DE CONSTRUCCIÓN ',
      title3: '',

      description:
        'Desarrollamos y ejecutamos proyectos de viviendas unifamiliares, multifamiliares, edificaciones comerciales e instituciones públicas y privadas, aplicando altos estándares de calidad, planificación y profesionalismo.',
      image: 'assets/images/arqui-4.jpg',
    },
    {
      place: '',
      title: 'TRÁMITES EN SUNARP,',
      title2: 'MUNICIPALIDADES, ',
      title3: 'DECLARATORIA Y SANEAMIENTO',
      description:
        'Brindamos asesoría y gestión de trámites ante SUNARP y municipalidades, facilitando procesos administrativos, documentación técnica y permisos necesarios para proyectos de construcción, licencias y formalización de inmuebles.',
      image: 'assets/images/arqui-5.jpg',
    },
    {
      place: '',
      title: 'ELABORACIÓN DE ',
      title2: 'EXPEDIENTES PARA ',
      title3: 'LICENCIA DE EDIFICACION',
      description:
        'Licencia de funcionamiento, Licencia de construccion,  Defensa civil, Independizacion de predio, Sub división de lotes.',
      image: 'assets/images/arqui-6.jpg',
    },
    {
      place: '',
      title: 'LICENCIA DE FUNCIONAMIENTO',
      title2: 'Y CERTIFICACION ',
      title3: 'ITSE - DEFENSA CIVIL',
      description:
        'Licencia de funcionamiento, Licencia de construccion,  Defensa civil, Independizacion de predio, Sub división de lotes.',
      image: 'assets/images/arqui-7.jpg',
    },
  ];

  // ── Estado interno ───────────────────────────────────────────────────
  slideNumbers: number[] = [];

  // Variables de layout (se recalculan en resize)
  private offsetTop = 200;
  private offsetLeft = 700;
  private readonly cardWidth = 200;
  private readonly cardHeight = 300;
  private readonly gap = 40;
  private readonly numberSize = 50;
  private readonly ease = 'sine.inOut';

  // Orden de los slides: el primero es el activo
  private order: number[] = [];

  // Alterna entre los dos bloques de detalles para animaciones cruzadas
  private detailsEven = true;

  // Contador de clicks para evitar doble-trigger
  private clicks = 0;

  // Referencia al loop para poder cancelarlo
  private loopPromise: any = null;
  private destroyed = false;
  private isBrowser: boolean;

  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.order = this.data.map((_, i) => i);
    this.slideNumbers = this.data.map((_, i) => i);
  }

  ngAfterViewInit(): void {
    // Solo ejecutar en el browser — en SSR/Node no hay DOM ni GSAP
    if (!this.isBrowser) return;
    this.ngZone.runOutsideAngular(() => {
      document.fonts.ready.then(() => {   // ← espera que Oswald cargue
        this.loadImages()
          .then(() => this.init())
          .catch(console.error);
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    // Verificamos que gsap existe antes de usarlo (SSR safety)
    if (this.isBrowser && typeof gsap !== 'undefined') {
      gsap.killTweensOf('*');
    }
  }

  // ── Helpers de selección ─────────────────────────────────────────────
  private getCard(index: number): string {
    return `#card${index}`;
  }
  private getCardContent(index: number): string {
    return `#card-content-${index}`;
  }
  private getSliderItem(index: number): string {
    return `#slide-item-${index}`;
  }

  // ── Animación genérica con Promise ───────────────────────────────────
  private animate(target: string, duration: number, props: object): Promise<void> {
    return new Promise((resolve) => {
      gsap.to(target, { ...props, duration, onComplete: resolve });
    });
  }

  // ── Inicialización ───────────────────────────────────────────────────
  private init(): void {
    const [active, ...rest] = this.order;
    const detailsActive = this.detailsEven ? '#details-even' : '#details-odd';
    const detailsInactive = this.detailsEven ? '#details-odd' : '#details-even';

    const { innerHeight: height, innerWidth: width } = window;
    this.offsetTop = height - 430;
    this.offsetLeft = width - 830;

    // Posición inicial de la paginación y nav (fuera de pantalla)
    gsap.set('#pagination', {
      top: this.offsetTop + 330,
      left: this.offsetLeft,
      y: 200,
      opacity: 0,
      zIndex: 60,
    });
    gsap.set('nav', { y: -200, opacity: 0 });

    // Card activa: ocupa toda la pantalla
    gsap.set(this.getCard(active), {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    gsap.set(this.getCardContent(active), { x: 0, y: 0, opacity: 0 });

    // Detalles activos: listos para entrar
    gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });

    // Detalles inactivos: reseteados
    gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
    gsap.set(`${detailsInactive} .text`, { y: 100 });
    gsap.set(`${detailsInactive} .title-1`, { y: 100 });
    gsap.set(`${detailsInactive} .title-2`, { y: 100 });
    gsap.set(`${detailsInactive} .desc`, { y: 50 });
    gsap.set(`${detailsInactive} .cta`, { y: 60 });

    // Barra de progreso
    gsap.set('.progress-sub-foreground', {
      width: 500 * (1 / this.order.length) * (active + 1),
    });

    // Cards secundarias: fila de miniaturas
    rest.forEach((i, index) => {
      const x = this.offsetLeft + 400 + index * (this.cardWidth + this.gap);
      gsap.set(this.getCard(i), {
        x,
        y: this.offsetTop,
        width: this.cardWidth,
        height: this.cardHeight,
        zIndex: 30,
        borderRadius: 10,
      });
      gsap.set(this.getCardContent(i), {
        x,
        zIndex: 40,
        y: this.offsetTop + this.cardHeight - 100,
      });
      gsap.set(this.getSliderItem(i), { x: (index + 1) * this.numberSize });
    });

    gsap.set('.indicator', { x: -window.innerWidth });

    const startDelay = 0.6;

    // Animación de entrada: cover sale, cards entran, nav aparece
    gsap.to('.cover', {
      x: width + 400,
      delay: 0.5,
      ease: this.ease,
      onComplete: () => {
        if (!this.destroyed) setTimeout(() => this.loop(), 500);
      },
    });

    rest.forEach((i, index) => {
      const x = this.offsetLeft + index * (this.cardWidth + this.gap);
      gsap.to(this.getCard(i), { x, zIndex: 30, ease: this.ease, delay: startDelay });
      gsap.to(this.getCardContent(i), { x, zIndex: 40, ease: this.ease, delay: startDelay });
    });

    gsap.to('#pagination', { y: 0, opacity: 1, ease: this.ease, delay: startDelay });
    gsap.to('nav', { y: 0, opacity: 1, ease: this.ease, delay: startDelay });
    gsap.to(detailsActive, { opacity: 1, x: 0, ease: this.ease, delay: startDelay });
  }

  // ── Step: avanza un slide ────────────────────────────────────────────
  private step(): Promise<void> {
    return new Promise((resolve) => {
      this.order.push(this.order.shift()!);
      this.detailsEven = !this.detailsEven;

      const detailsActive = this.detailsEven ? '#details-even' : '#details-odd';
      const detailsInactive = this.detailsEven ? '#details-odd' : '#details-even';

      // Actualiza el contenido del bloque de detalles que va a entrar
      const activeData = this.data[this.order[0]];
      (document.querySelector(`${detailsActive} .place-box .text`) as HTMLElement).textContent =
        activeData.place;
      (document.querySelector(`${detailsActive} .title-1`) as HTMLElement).textContent =
        activeData.title;
      (document.querySelector(`${detailsActive} .title-2`) as HTMLElement).textContent =
        activeData.title2;
      const title3El = document.querySelector(`${detailsActive} .title-3`) as HTMLElement;
      if (title3El) title3El.textContent = activeData.title3 || '';

      const box3 = document.querySelector(`${detailsActive} .title-box-3`) as HTMLElement;
      if (box3) box3.style.display = activeData.title3 ? 'block' : 'none';
      (document.querySelector(`${detailsActive} .desc`) as HTMLElement).textContent =
        activeData.description;

      // Anima la entrada del texto escalonado
      gsap.set(detailsActive, { zIndex: 22 });
      gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease: this.ease });
      gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.1, duration: 0.7, ease: this.ease });
      gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease: this.ease });
      gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease: this.ease });
      gsap.to(`${detailsActive} .title-3`, { y: 0, delay: 0.15, duration: 0.7, ease: this.ease });
      gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease: this.ease });
      gsap.to(`${detailsActive} .cta`, {
        y: 0,
        delay: 0.35,
        duration: 0.4,
        ease: this.ease,
        onComplete: resolve,
      });

      gsap.set(detailsInactive, { zIndex: 12 });

      const [active, ...rest] = this.order;
      const prv = rest[rest.length - 1];

      // Card activa se expande; la anterior escala y se va al fondo
      gsap.set(this.getCard(prv), { zIndex: 10 });
      gsap.set(this.getCard(active), { zIndex: 20 });
      gsap.to(this.getCard(prv), { scale: 1.5, ease: this.ease });

      gsap.to(this.getCardContent(active), {
        y: this.offsetTop + this.cardHeight - 10,
        opacity: 0,
        duration: 0.3,
        ease: this.ease,
      });

      gsap.to(this.getSliderItem(active), { x: 0, ease: this.ease });
      gsap.to(this.getSliderItem(prv), { x: -this.numberSize, ease: this.ease });
      gsap.to('.progress-sub-foreground', {
        width: 500 * (1 / this.order.length) * (active + 1),
        ease: this.ease,
      });

      // Card activa se expande a pantalla completa
      gsap.to(this.getCard(active), {
        x: 0,
        y: 0,
        ease: this.ease,
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
        onComplete: () => {
          // Reposiciona la card anterior al final de la fila
          const xNew = this.offsetLeft + (rest.length - 1) * (this.cardWidth + this.gap);
          gsap.set(this.getCard(prv), {
            x: xNew,
            y: this.offsetTop,
            width: this.cardWidth,
            height: this.cardHeight,
            zIndex: 30,
            borderRadius: 10,
            scale: 1,
          });
          gsap.set(this.getCardContent(prv), {
            x: xNew,
            y: this.offsetTop + this.cardHeight - 100,
            opacity: 1,
            zIndex: 40,
          });
          gsap.set(this.getSliderItem(prv), { x: rest.length * this.numberSize });

          // Resetea el bloque inactivo
          gsap.set(detailsInactive, { opacity: 0 });
          gsap.set(`${detailsInactive} .text`, { y: 100 });
          gsap.set(`${detailsInactive} .title-1`, { y: 100 });
          gsap.set(`${detailsInactive} .title-2`, { y: 100 });
          gsap.set(`${detailsInactive} .title-3`, { y: 100 });
          gsap.set(`${detailsInactive} .desc`, { y: 50 });
          gsap.set(`${detailsInactive} .cta`, { y: 60 });

          this.clicks -= 1;
          if (this.clicks > 0) this.step();
        },
      });

      // Reposiciona las demás cards en la fila
      rest.forEach((i, index) => {
        if (i !== prv) {
          const xNew = this.offsetLeft + index * (this.cardWidth + this.gap);
          gsap.set(this.getCard(i), { zIndex: 30 });
          gsap.to(this.getCard(i), {
            x: xNew,
            y: this.offsetTop,
            width: this.cardWidth,
            height: this.cardHeight,
            ease: this.ease,
            delay: 0.1 * (index + 1),
          });
          gsap.to(this.getCardContent(i), {
            x: xNew,
            y: this.offsetTop + this.cardHeight - 100,
            opacity: 1,
            zIndex: 40,
            ease: this.ease,
            delay: 0.1 * (index + 1),
          });
          gsap.to(this.getSliderItem(i), { x: (index + 1) * this.numberSize, ease: this.ease });
        }
      });
    });
  }

  // ── Loop automático ──────────────────────────────────────────────────
  private async loop(): Promise<void> {
    if (this.destroyed) return;
    await this.animate('.indicator', 2, { x: 0 });
    await this.animate('.indicator', 0.8, { x: window.innerWidth, delay: 0.3 });
    gsap.set('.indicator', { x: -window.innerWidth });
    await this.step();
    this.loop();
  }

  // ── Click en flechas ─────────────────────────────────────────────────
  onNext(): void {
    this.ngZone.runOutsideAngular(() => {
      this.clicks += 1;
      if (this.clicks === 1) this.step();
    });
  }

  onPrev(): void {
    // Para ir hacia atrás rotamos el orden en sentido inverso
    this.ngZone.runOutsideAngular(() => {
      // Mueve el último al frente (efecto inverso)
      this.order.unshift(this.order.pop()!);
      this.order.unshift(this.order.pop()!);
      this.clicks += 1;
      if (this.clicks === 1) this.step();
    });
  }

  // ── Precarga de imágenes ─────────────────────────────────────────────
  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      // Usamos document.createElement en lugar de new Image()
      // para compatibilidad con SSR (Node no tiene constructor Image global)
      const img = document.createElement('img');
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  private loadImages(): Promise<HTMLImageElement[]> {
    return Promise.all(this.data.map(({ image }) => this.loadImage(image)));
  }

  // ── Responsive: recalcula offsets en resize ──────────────────────────
  @HostListener('window:resize')
  onResize(): void {
    this.ngZone.runOutsideAngular(() => {
      this.offsetTop = window.innerHeight - 430;
      this.offsetLeft = window.innerWidth - 830;
    });
  }
}
