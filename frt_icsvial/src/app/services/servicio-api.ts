import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { API_BASE_URL, API_SERVICIOS_PATH } from '../constants/api.constants';
import { Servicio } from '../models/servicio.model';

const SERVICIOS_REQUEST_ERROR = 'No fue posible obtener los servicios desde la API.';

@Injectable({
  providedIn: 'root'
})
export class ServicioApi {
  private readonly endpoint = `${API_BASE_URL}${API_SERVICIOS_PATH}`;

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Obtiene todos los servicios registrados en la API.
   */
  listServicios(): Observable<Servicio[]> {
    return this.httpClient.get<Servicio[]>(this.endpoint).pipe(
      catchError((error: unknown) => {
        return throwError(() => new Error(SERVICIOS_REQUEST_ERROR, { cause: error }));
      })
    );
  }
}
