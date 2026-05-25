import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios-1',

  imports: [CommonModule],
  templateUrl: './servicios-1.html',
  styleUrl: './servicios-1.css',
})
export class Servicios1 {
  tiktokVideo1 = 'https://www.tiktok.com/@tu_usuario/video/VIDEO_ID_1';
  tiktokVideo2 = 'https://www.tiktok.com/@tu_usuario/video/VIDEO_ID_2';

  videoPoster1 = 'assets/videos/poster1.jpg';
  videoPoster2 = 'assets/videos/poster2.jpg';

  videoSrc1 = 'assets/videos/video1.mp4';
  videoSrc2 = 'assets/videos/video2.mp4';

  planosItems = [
    'LICENCIA DE FUNCIONAMIENTO',
    'LICENCIA DE CONSTRUCCION',
    'CERTIFICADO ITSE-DEFENSA CIVIL',
    'INDEPENDIZACION DE PREDIO',
    'UBICACIÓN Y LOCALIZACIÓN',
    'SUB DIVISIÓN DE LOTES',
  ];

  expedientesItems = [
    'LICENCIA DE FUNCIONAMIENTO',
    'LICENCIA DE CONSTRUCCIÓN',
    'CERTIFICADO ITSE – DEFENSA CIVIL',
    'INDEPENDIZACIÓN DE PREDIO',
    'SUB-DIVISIÓN DE LOTES',
  ];

  toggleVideo(video: HTMLVideoElement, btn: HTMLButtonElement) {
    if (video.paused) {
      video.play();
      btn.querySelector('i')!.className = 'bi bi-pause-circle-fill';
    } else {
      video.pause();
      btn.querySelector('i')!.className = 'bi bi-play-circle-fill';
    }
  }
}
