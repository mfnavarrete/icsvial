import { Component, Input } from '@angular/core';

import { API_BASE_URL } from '../../constants/api.constants';
import { Cliente } from '../../models/cliente.model';

const EMPTY_CLIENTES_MESSAGE = 'No hay clientes disponibles en este momento.';

@Component({
  selector: 'app-cliente-list',
  imports: [],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.css'
})
export class ClienteList {
  @Input({ required: true }) clientes: Cliente[] = [];
  @Input() emptyMessage = EMPTY_CLIENTES_MESSAGE;

  /**
   * Construye una URL absoluta de imagen a partir de la ruta relativa guardada en la API.
   */
  protected getImageUrl(imagePath: string): string {
    return imagePath.startsWith('http') ? imagePath : `${API_BASE_URL}${imagePath}`;
  }
}
