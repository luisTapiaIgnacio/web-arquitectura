import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-pack-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paquetes.html',
  styleUrls: ['./paquetes.css']
})
export class PaquetesCard {
  @Input() nombre: string = 'SILVER PACK';
  @Input() badgeColor: string = '#ecad29';   // color del badge
  @Input() badgeTextColor: string = '#111';
  @Input() topColor: string = '#ff5f33';     // color de la forma superior
  @Input() bodyColor: string = '#0e9ab5';    // color del cuerpo
  @Input() imagen: string = '';
  @Input() precio: string = '$ 30';
  @Input() moneda: string = 'USD';
  @Input() items: string[] = [];
}
