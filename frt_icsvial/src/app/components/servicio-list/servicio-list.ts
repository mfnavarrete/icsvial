import { Component, Input } from '@angular/core';

import { API_BASE_URL } from '../../constants/api.constants';
import { Servicio } from '../../models/servicio.model';

const EMPTY_SERVICES_MESSAGE = 'No hay servicios disponibles en este momento.';

@Component({
  selector: 'app-servicio-list',
  imports: [],
  templateUrl: './servicio-list.html',
  styleUrl: './servicio-list.css'
})
export class ServicioList {
  @Input({ required: true }) servicios: Servicio[] = [];
  @Input() emptyMessage = EMPTY_SERVICES_MESSAGE;

  /**
   * Construye una URL absoluta de imagen a partir de la ruta relativa guardada en la API.
   */
  protected getImageUrl(imagePath: string): string {
    return imagePath.startsWith('http') ? imagePath : `${API_BASE_URL}${imagePath}`;
  }
}
