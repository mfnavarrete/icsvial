import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { API_BASE_URL, API_BLOGS_PATH } from '../constants/api.constants';
import { BlogPost } from '../models/blog.model';

const BLOGS_REQUEST_ERROR = 'No fue posible obtener los blogs desde la API.';
const BLOG_BY_ID_REQUEST_ERROR = 'No fue posible obtener el blog solicitado desde la API.';

@Injectable({
  providedIn: 'root'
})
export class BlogApi {
  private readonly endpoint = `${API_BASE_URL}${API_BLOGS_PATH}`;

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Obtiene todos los blogs registrados en la API.
   */
  listBlogs(): Observable<BlogPost[]> {
    return this.httpClient.get<BlogPost[]>(this.endpoint).pipe(
      catchError((error: unknown) => {
        return throwError(() => new Error(BLOGS_REQUEST_ERROR, { cause: error }));
      })
    );
  }

  /**
   * Obtiene un blog específico por su identificador.
   */
  getBlogById(id: number): Observable<BlogPost> {
    return this.httpClient.get<BlogPost>(`${this.endpoint}/${id}`).pipe(
      catchError((error: unknown) => {
        return throwError(() => new Error(BLOG_BY_ID_REQUEST_ERROR, { cause: error }));
      })
    );
  }
}
