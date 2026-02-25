import { Component, Input } from '@angular/core';

/**
 * Hero reutilizable para encabezados de página.
 */
@Component({
  selector: 'app-page-hero',
  imports: [],
  templateUrl: './page-hero.html',
  styleUrl: './page-hero.css'
})
export class PageHero {
  /**
   * Título principal mostrado en el hero.
   */
  @Input({ required: true }) title = '';

  /**
   * Ruta absoluta o relativa de la imagen de fondo.
   */
  @Input({ required: true }) backgroundImage = '';
}
