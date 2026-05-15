import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})
export class Servicios {

  @Input() reversed: boolean = false;

  tiktokVideo1 = 'https://www.tiktok.com/@tu_usuario/video/VIDEO_ID_1';
  tiktokVideo2 = 'https://www.tiktok.com/@tu_usuario/video/VIDEO_ID_2';
  videoPoster1 = 'assets/images/poster1.jpg';
  videoPoster2 = 'assets/images/poster2.jpg';
  videoSrc1 = 'assets/videos/video-1.mp4';
  videoSrc2 = 'assets/videos/video2.mp4';

  planosItems = [
    'ARQUITECTÓNICOS',
    'ESTRUCTURALES',
    'INSTALACIONES SANITARIAS',
    'INSTALACIONES ELÉCTRICAS',
    'UBICACIÓN Y LOCALIZACIÓN',
    'SEÑALIZACIÓN Y EVACUACIÓN',
  ];

  expedientesItems = [
    'LICENCIA DE FUNCIONAMIENTO',
    'LICENCIA DE CONSTRUCCIÓN',
    'CERTIFICADO ITSE – DEFENSA CIVIL',
    'INDEPENDIZACIÓN DE PREDIO',
    'SUB-DIVISIÓN DE LOTES',
  ];

  isPlaying = false;

  toggleVideo(video: HTMLVideoElement, btn: HTMLButtonElement): void {
    if (video.paused) {
      video.play();
      this.isPlaying = true;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="#111"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    } else {
      video.pause();
      this.isPlaying = false;
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="#111"><path d="M8 5v14l11-7z"/></svg>';
    }
  }
}