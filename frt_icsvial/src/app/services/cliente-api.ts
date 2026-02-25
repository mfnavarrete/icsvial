import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { API_BASE_URL, API_CLIENTES_PATH } from '../constants/api.constants';
import { Cliente } from '../models/cliente.model';

const CLIENTES_REQUEST_ERROR = 'No fue posible obtener los clientes desde la API.';

@Injectable({
  providedIn: 'root'
})
export class ClienteApi {
  private readonly endpoint = `${API_BASE_URL}${API_CLIENTES_PATH}`;

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Obtiene todos los clientes registrados en la API.
   */
  listClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.endpoint).pipe(
      catchError((error: unknown) => {
        return throwError(() => new Error(CLIENTES_REQUEST_ERROR, { cause: error }));
      })
    );
  }
}
