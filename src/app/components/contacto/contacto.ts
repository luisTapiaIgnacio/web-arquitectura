import { CommonModule, isPlatformBrowser  } from '@angular/common';
import { Component,PLATFORM_ID, Inject , AfterViewInit, ChangeDetectorRef   } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

const SERVICE_ID  = 'service_zrue91q';
const TEMPLATE_ID = 'template_17enuqk';
const PUBLIC_KEY  = 'lZz7sbGwd7e5ZN4Ye';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})


export class Contacto implements AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  onSubmit(): void {
    this.status = 'loading';
  
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      name:    this.formData.name,
      email:   this.formData.email,
      subject: this.formData.subject,
      message: this.formData.message
    }, PUBLIC_KEY)
    .then(() => {
      this.status = 'success';
      this.formData = { name: '', email: '', subject: '', message: '' };
      this.cdr.detectChanges(); // fuerza a Angular a actualizar la vista
    })
    .catch(() => {
      this.status = 'error';
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof (window as any)['AOS'] !== 'undefined') {
        (window as any)['AOS'].init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      }
    }
  }
}